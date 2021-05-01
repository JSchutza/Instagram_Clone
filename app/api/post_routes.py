import boto3
import uuid
import os
import ast
from flask import Blueprint, redirect, request
from app.models import Post, User, db, Comment, Like
from flask_login import login_required, current_user
from app.forms import CreatePostForm, CreateCommentForm
from werkzeug.datastructures import CombinedMultiDict


s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
)
BUCKET_NAME = "group14"
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type},
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


post_routes = Blueprint("posts", __name__)


@post_routes.route("")
@login_required
def posts():
    user_id = int(current_user.get_id())
    # user = User.query.get(3)
    user = User.query.get(user_id)
    result = []

    for follower in user.followers:
        for post in Post.query.filter(Post.userId == follower.id):
            result.append(post)
    result.sort(key=lambda post: post.createdAt)

    if result is None:
        return "no posts found"
    return {"posts": [post.to_dict() for post in result]}


@post_routes.route("/user/<int:uid>")
@login_required
def user_posts(uid):
    user_id = uid
    posts = Post.query.filter(Post.userId == user_id)

    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route("/<int:id>")
def post(id):
    post = Post.query.get(id)
    if post is None:
        return "no posts found"
    return post.to_dict()


@post_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    caption = request.form['caption']
    print('*****************IMAGE************************', image)
    print('******************CAPTION**********************', request.form['caption'])

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Post(
        userId=current_user.get_id(), url=url, caption=caption
    )
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

# def post_post():

    # form = CreatePostForm(CombinedMultiDict((request.files, request.form)))
    # form["csrf_token"].data = request.cookies["csrf_token"]

    # if form.validate_on_submit():
    #     # print(form.data, "------------------------------------------ \n")

    #     image = form.data["image"]
    #     # print(dir(image), "------------------------------------------ \n")

    #     if not allowed_file(image.filename):
    #         return {"errors": "file type not permitted"}, 400

    #     image.filename = get_unique_filename(image.filename)
    #     upload = upload_file_to_s3(image)

    #     if "url" not in upload:
    #         # if the dictionary doesn't have a url key
    #         # it means that there was an error when we tried to upload
    #         # so we send back that error message
    #         return upload, 400

    #     url = upload["url"]
    #     # flask_login allows us to get the current user from the request

    #     new_image = Post(
    #         userId=current_user.get_id(), url=url, caption=form.data["caption"]
    #     )

    #     db.session.add(new_image)
    #     db.session.commit()
    #     return {"url": url}
    # return {"message": "error creating a post. "}


@post_routes.route("/<int:pid>", methods=["PUT"])
@login_required
def post_put(pid):
    post = Post.query.get(pid)
    byteString = request.data
    dictString = byteString.decode('UTF-8')
    data = ast.literal_eval(dictString)
    # print('***************** DATA *************************',data)
    # print('**************** FORM *********************', dir(request.data))
    post.caption = data['caption']
    # print(post.to_dict())
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route("/<int:pid>", methods=["DELETE"])
@login_required
def post_delete(pid):

    user_id = int(current_user.get_id())
    post_user = Post.query.get(pid).userId
    if user_id == post_user:
        post_url = Post.query.get(pid).url
        key = post_url[33:]
        if post_url.startswith(S3_LOCATION):
            s3.delete_object(Bucket=BUCKET_NAME, Key=key)
        post = Post.query.get(pid)
        db.session.delete(post)
        db.session.commit()
    return {"message": "success"}


@post_routes.route("/<int:pid>/comments", methods=["POST"])
@login_required
def comment_post(pid):
    user_id = int(current_user.get_id())
    form = CreateCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print(form.data)
        new_comment = Comment(userId=user_id, postId=pid,
                              body=form.data["body"])
        db.session.add(new_comment)
        db.session.commit()
        return {new_comment.to_dict()["id"]: new_comment.to_dict()}
    return {"message": "errors"}


@post_routes.route("/comments/<int:cid>", methods=["PUT"])
@login_required
def comment_put(cid):
    old_comment = Comment.query.get(int(cid))
    byte_str = request.data
    dict_str = byte_str.decode("UTF-8")
    data = ast.literal_eval(dict_str)
    old_comment.body = data
    db.session.add(old_comment)
    db.session.commit()
    return old_comment.to_dict()


@post_routes.route("/<int:id>/comments/<int:cid>", methods=["DELETE"])
@login_required
def comment_delete(id, cid):
    old_comment = Comment.query.get(cid)
    user_id = int(current_user.get_id())
    comment_user = Comment.query.get(cid).userId
    if user_id == comment_user:
        db.session.delete(old_comment)
        db.session.commit()
        return {"status": 200}
    return {"status": 400}


# POST /api/post/:id/likes
# DELETE /api/post/:id/likes/:id


@post_routes.route("/<int:id>/likes", methods=["POST"])
@login_required
def like_post(id):
    user_id = int(current_user.get_id())
    new_like = Like(userId=user_id, postId=id)
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()


@post_routes.route("/<int:id>/likes/<int:lid>", methods=["DELETE"])
@login_required
def like_delete(id, lid):
    old_like = Like.query.get(lid)
    db.session.delete(old_like)
    db.session.commit()
    return old_like.to_dict()

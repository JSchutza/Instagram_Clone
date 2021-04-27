import boto3
import uuid
import os
from flask import Blueprint, redirect, request
from app.models import Post, db
from flask_login import login_required, current_user


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


@post_routes.route("/")
@login_required
def posts():
    user_id = current_user.get_id()
    posts = Post.query.filter(Post.userId == user_id)
    if posts is None:
        return "no posts found"
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route("/<int:id>")
def post(id):
    post = Post.query.get(id)
    if post is None:
        return "no posts found"
    return post.to_dict()


@post_routes.route("", methods=["POST"])
@login_required
def post_post():
    print(request.form)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    form = request.form
    form = dict(form)
    print(form)

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

    new_image = Post(userId=current_user.get_id(), url=url, caption=form["caption"])

    db.session.add(new_image)
    db.session.commit()
    return {"url": url}


@post_routes.route("/", methods=["PUT"])
@login_required
def post_put():
    pass


@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def post_delete(id):
    user_id = current_user.get_id()
    post_user = Post.query.get(id).userId
    if user_id == post_user:
        post_url = Post.query.get(id).url
        key = post_url[33:]
        s3.delete_object(Bucket=BUCKET_NAME, Key=key)
        post = Post.query.get(id)
        db.session.delete(post)
        db.session.commit()
    return redirect("/")

from flask import Blueprint, redirect, request
from app.models import Post
from flask_login import login_required, current_user

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


@post_routes.route("/", methods=["POST"])
@login_required
def post_post():
    pass


@post_routes.route("/", methods=["PUT"])
@login_required
def post_post():
    pass


@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def post_delete(id):
    user_id = current_user.get_id()
    post_user = Post.query.get(id).userId
    if user_id == post_user:
        Post.query.delete(id)
        return redirect("/")

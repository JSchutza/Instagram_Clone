

from flask import Blueprint, redirect
from app.models import Post
from flask_login import login_required

post_routes = Blueprint('posts', __name__)




@post_routes.route("/u/<int:userId>")
# @login_required
def posts(userId):
  posts = Post.query.filter(Post.userId == userId)
  if posts is None:
    return "no posts found"
  return {"posts": [post.to_dict() for post in posts]}



@post_routes.route("/<int:id>")
def post(id):
  post = Post.query.get(id)
  if post is None:
    return "no posts found"
  return post.to_dict()



@post_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
# also need to check if the person is the owner of the post they are deleting
def post_delete(id):
  try:
    Post.query.delete(id)
    return redirect('/')
  except:
    return 'no post found'

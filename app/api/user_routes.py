
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Like, Post, db
from sqlalchemy import select
from app.models.user import follower_to_followee

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()



@user_routes.route('/followers')
@login_required
def followers():
    userId = current_user.get_id()
    user = User.query.get(userId)
    user_data = user.to_dict()
    followers_array = user_data["followers"]

    normalized_data = { followers_array[each]: User.query.get(followers_array[each]).username
                        for each in range(len(followers_array)) }

    return { "username": user.username, "id": user.id, "followers": normalized_data }



@user_routes.route('/posts')
@login_required
def users_posts():
    userId = current_user.get_id()
    user = User.query.get(userId)
    user_data = user.get_user_posts()

    user_data = user_data["posts"]

    normalized_data = {each["id"]: each for each in user_data}

    return {"username": user.username, "id": user.id, "posts": normalized_data }



@user_routes.route('/comments')
@login_required
def users_comments():
    userId = current_user.get_id()
    user = User.query.get(userId)
    user_data = user.get_user_comments()
    user_data = user_data["comments"]
    # set the key here to comment id but may want to set it to postId so we can look it up in the store??
    normalized_data = {each["id"]: each for each in user_data}


    return {"username": user.username, "id": user.id, "comments": normalized_data }



@user_routes.route('/likes')
@login_required
def users_likes():
    userId = current_user.get_id()
    user = User.query.get(userId)
    user_data = user.get_user_likes()
    user_data = user_data["likes"]
    # set the key here to like id but may want to set it to postId so we can look it up in the store??
    normalized_data = {each["id"]: each for each in user_data}

    return {"username": user.username, "id": user.id, "likes": normalized_data}

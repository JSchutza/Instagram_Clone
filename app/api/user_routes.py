
from flask import Blueprint, jsonify
from flask_login import login_required
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



@user_routes.route('/followers/<int:id>')
@login_required
def followers(id):
    user = User.query.get(id)
    user_data = user.to_dict()
    followers_array = user_data["followers"]

    normalized_data = { followers_array[each]: User.query.get(followers_array[each]).username
                        for each in range(len(followers_array)) }

    return { "username": user.username, "id": user.id, "followers": normalized_data }

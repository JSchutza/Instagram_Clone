
from flask import Blueprint, jsonify, request
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

@user_routes.route('/follow')
@login_required
def follow():
    userId1 = int(current_user.get_id())
    userId2 = int(request.args['userId2'])
    
    user1 = User.query.get(userId1)
    user2 = User.query.get(userId2)
    
    if user2 in user1.followers:
        user1.followers.remove(user2)
    else:
        user1.followers.append(user2)
    db.session.commit()
    return '200'

@user_routes.route('/reset')
@login_required
def reset():
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    return {'user': user.to_dict()}
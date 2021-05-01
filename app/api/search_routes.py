from flask import Blueprint, redirect, request
from app.models import Post, User, db, Comment, Like
from flask_login import login_required, current_user
from sqlalchemy import func
from fuzzywuzzy import process

search_routes = Blueprint("search", __name__)


@search_routes.route("")
def search():
    query = request.args["q"]

    if len(query) == 0:
        return {"message": "no posts found"}

    choices = [user.username for user in User.query.all()]
    filtered = [x for (x, y) in process.extract(query, choices, limit=20)]
    results = []

    for item in filtered:
        results.append(User.query.filter(User.username.ilike(item)).one())

    return {"results": [result.to_dict() for result in results]}
    print(process.extract(query, choices, limit=20))

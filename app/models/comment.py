from .db import db
from .user import User
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete='CASCADE'), nullable=False)
    body = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "body": self.body,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "username": User.query.get(self.userId).username,
        }

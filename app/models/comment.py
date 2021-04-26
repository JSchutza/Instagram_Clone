from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    postId = db.Column(db.Integer, ForeignKey('post.id'), nullable=False)
    body = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.datetime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.datetime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "body": self.body,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }

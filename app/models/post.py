from .db import db
from .user import User
from datetime import datetime




class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(100))
    url = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    likes = db.relationship("Like", backref="posts", cascade="all, delete", passive_deletes=True)
    comments = db.relationship(
        "Comment", backref="posts", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "url": self.url,
            "userId": self.userId,
            "username": User.query.get(self.userId).username,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes]
        }

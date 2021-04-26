from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(100))
    url = db.Column(db.String, nullable=False, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    likes = db.relationship("Like", backref="posts", cascade="all, delete")
    comments = db.relationship(
        "Comment", backref="posts", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "url": self.url,
            "userId": self.userId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }

from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follower_to_followee = db.Table(
    "follower_to_followee",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followee_id", db.Integer, db.ForeignKey("users.id")),
)


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    posts = db.relationship("Post", backref="users", cascade="all, delete")
    likes = db.relationship("Like", backref="users", cascade="all, delete")
    comments = db.relationship("Comment", backref="users", cascade="all, delete")
    followers = db.relationship(
        "User",
        secondary=follower_to_followee,
        primaryjoin=id == follower_to_followee.c.follower_id,
        secondaryjoin=id == follower_to_followee.c.followee_id,
        backref=db.backref("follower_to_followee", lazy="joined"),
        lazy="joined",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "posts": [post.to_dict() for post in self.posts],
            "followers": [follower.username for follower in self.followers],
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes],
        }

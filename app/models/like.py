from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
        }

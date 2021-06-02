
from app.models import db, Like
from random import randint


def seed_likes():
    count = 500
    result = []
    tracker = set()
    while count > 0:
        userId = randint(1, 200)
        postId = randint(1, 500)
        tup = (userId, postId)

        if tup in tracker:
            continue

        tracker.add(tup)
        result.append(Like(userId=userId, postId=postId))
        count -= 1

    for like in result:
        db.session.add(like)
        db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()

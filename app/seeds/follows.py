
from app.models import db, User
from app.models.user import follower_to_followee
from random import randint


def seed_follows():

    count = 1000
    result = []
    tracker = set()
    while count > 0:
        userIdOne = randint(1, 200)
        userIdTwo = randint(1, 200)
        if userIdOne == userIdTwo:
            continue

        tup = (userIdOne, userIdTwo)

        if tup in tracker:
            continue

        tracker.add(tup)
        follower = User.query.get(userIdOne)
        followee = User.query.get(userIdTwo)
        follower.followers.append(followee)
        db.session.commit()
        count -= 1


def undo_follows():
    db.session.execute(
        'TRUNCATE follower_to_followee RESTART IDENTITY CASCADE;')
    db.session.commit()

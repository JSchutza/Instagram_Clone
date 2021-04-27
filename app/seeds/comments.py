
from app.models import db, Comment
from faker import Faker
from random import randint


fake = Faker()




def seed_comments():
  count = 4000
  result = []
  while count > 0:
    result.append(Comment(userId=randint(1, 200), postId=randint(1, 4000), body=fake.text(max_nb_chars=100)))
    count -= 1


  for comment in result:
    db.session.add(comment)
    db.session.commit()













def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()

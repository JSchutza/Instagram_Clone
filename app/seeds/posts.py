import requests
from app.models import db, Post
from faker import Faker
from random import randint


fake = Faker()



# https://picsum.photos/614/614
def get_random_img():
  response = requests.get('https://picsum.photos/614/614')

  if response.status_code == 200:
    return response.url
  return None




def seed_posts():
  count = 4000
  result = []
  while count > 0:
    result.append(Post(caption=fake.text(max_nb_chars=100), url=get_random_img(), userId=randint(1, 200)))
    count -= 1

  for post in result:
    db.session.add(post)
    db.session.commit()





def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()

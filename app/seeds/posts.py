import requests
from app.models import db, Post
from faker import Faker
from random import randint


fake = Faker()


def get_random_img():
  response = requests.get("https://picsum.photos/v2/list")

  if response.status_code == 200:

    result = []
    for each in response.json():
      result.append(each["download_url"])

    return result
  return None








def seed_posts():
  url_list = get_random_img()
  count = 4000
  result = []
  while count > 0:
    result.append(Post(caption=fake.text(max_nb_chars=100), url=url_list[randint(1, 29)], userId=randint(1, 200)))
    count -= 1

  for post in result:
    db.session.add(post)
    db.session.commit()





def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()

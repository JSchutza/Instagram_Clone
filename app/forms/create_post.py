
from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileRequired, FileAllowed





class CreatePostForm(FlaskForm):
  caption = StringField("caption")
  image = FileField("image")

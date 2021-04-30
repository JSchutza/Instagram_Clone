
from flask_wtf import FlaskForm
from wtforms import StringField


class CreateCommentForm(FlaskForm):
    body = StringField("body")

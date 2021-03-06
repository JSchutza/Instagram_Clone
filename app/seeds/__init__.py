from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .follows import seed_follows, undo_follows

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_follows()
    # Add other seed functions here


# @seed_commands.command("follows")
# def seed_follows():
#     seed_follows()


# @seed_commands.command("followsundo")
# def seed_follows_undo():
#     undo_follows()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments()
    undo_likes()
    undo_follows()

    # Add other undo functions here

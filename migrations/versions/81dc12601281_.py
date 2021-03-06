"""empty message

Revision ID: 81dc12601281
Revises: 7bed9c90dff1
Create Date: 2021-04-28 16:46:29.316879

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81dc12601281'
down_revision = '7bed9c90dff1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('likes_userId_fkey', 'likes', type_='foreignkey')
    op.drop_constraint('likes_postId_fkey', 'likes', type_='foreignkey')
    op.create_foreign_key(None, 'likes', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'likes', 'posts', ['postId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('posts_userId_fkey', 'posts', type_='foreignkey')
    op.create_foreign_key(None, 'posts', 'users', ['userId'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.create_foreign_key('posts_userId_fkey', 'posts', 'users', ['userId'], ['id'])
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.create_foreign_key('likes_postId_fkey', 'likes', 'posts', ['postId'], ['id'])
    op.create_foreign_key('likes_userId_fkey', 'likes', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###

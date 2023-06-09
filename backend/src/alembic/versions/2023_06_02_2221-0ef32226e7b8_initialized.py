"""Initialized

Revision ID: 0ef32226e7b8
Revises: 
Create Date: 2023-06-02 22:21:45.784091

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ef32226e7b8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=True),
    sa.Column('created_at', sa.Integer(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word', sa.String(), nullable=True),
    sa.Column('part_of_speech', sa.String(), nullable=True),
    sa.Column('uk_audio', sa.String(), nullable=True),
    sa.Column('us_audio', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('word')
    )
    op.create_index(op.f('ix_words_id'), 'words', ['id'], unique=False)
    op.create_table('blacklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('started_at', sa.Integer(), nullable=True),
    sa.Column('finish_at', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_blacklist_id'), 'blacklist', ['id'], unique=False)
    op.create_table('user_words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['word_id'], ['words.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_words_id'), 'user_words', ['id'], unique=False)
    op.create_table('word_definitions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word_id', sa.Integer(), nullable=True),
    sa.Column('definition', sa.String(), nullable=True),
    sa.Column('part_of_speech', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['word_id'], ['words.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_word_definitions_id'), 'word_definitions', ['id'], unique=False)
    op.create_table('word_sentences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word_id', sa.Integer(), nullable=True),
    sa.Column('sentence', sa.String(), nullable=True),
    sa.Column('part_of_speech', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['word_id'], ['words.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_word_sentences_id'), 'word_sentences', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_word_sentences_id'), table_name='word_sentences')
    op.drop_table('word_sentences')
    op.drop_index(op.f('ix_word_definitions_id'), table_name='word_definitions')
    op.drop_table('word_definitions')
    op.drop_index(op.f('ix_user_words_id'), table_name='user_words')
    op.drop_table('user_words')
    op.drop_index(op.f('ix_blacklist_id'), table_name='blacklist')
    op.drop_table('blacklist')
    op.drop_index(op.f('ix_words_id'), table_name='words')
    op.drop_table('words')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###

from flask.cli import AppGroup
from .users import seed_users, undo_users
from .messages import seed_messages, undo_messages
from .channels import seed_channels, undo_channels
from .servers import seed_servers, undo_servers
from .emojis import seed_emojis, undo_emojis
from .reactions import seed_reactions, undo_reactions
from .friends import seed_friends, undo_friends
# from .privateMessages import seed_private_messages, undo_private_messages
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reactions()
        undo_messages()
        undo_emojis()
        # undo_private_messages()
        undo_channels()
        undo_servers()
        undo_friends()
        undo_users()
    seed_users()
    seed_friends()
    seed_servers()
    seed_channels()
    # seed_private_messages()
    seed_emojis()
    seed_messages()
    seed_reactions()




# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reactions()
    undo_emojis()
    undo_messages()
    # undo_private_messages()
    undo_channels()
    undo_servers()
    undo_friends()
    undo_users()
    # Add other undo functions here

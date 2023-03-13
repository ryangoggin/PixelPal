from flask.cli import AppGroup
from .users import seed_users, undo_users
<<<<<<< HEAD
from .messages import seed_messages, undo_messages
from .channels import seed_channels, undo_channels

=======
from .servers import seed_servers, undo_servers
>>>>>>> servers
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
<<<<<<< HEAD
        seed_users()
        seed_channels()
        seed_messages()
=======
        undo_servers()
        undo_users()
    demo, marnie, bobbie = seed_users()
>>>>>>> servers
    # Add other seed functions here
    app_academy_server, pixel_pack_server = seed_servers()
    app_academy_server.members.append(demo)
    pixel_pack_server.members.extend([marnie, bobbie])
    db.session.commit()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
<<<<<<< HEAD
    undo_messages()
    undo_channels()
=======
    undo_servers()
>>>>>>> servers
    undo_users()
    # Add other undo functions here

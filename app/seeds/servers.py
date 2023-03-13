from app.models import db, User, Server, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import User


# Adds a demo server, you can add other servers here if you want
def seed_servers():
    servers = [
        Server(
            owner_id=1,
            name="App Academy",
            description="Server for App Academy students to connect and help one another",
            server_picture='image.url'
        ),
        Server(
            owner_id=2,
            name="Pixel Pals Rock",
            description="Server for the cool cats that call themselves Pixel Pals",
            server_picture='image.url'
        )
    ]

    users = User.query.all()

    first_group = list(users[0:3])
    second_group = list(users[3:])


    servers[0].members.extend(first_group)
    servers[1].members.extend(second_group)


    db.session.add_all(servers)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server")) #please note that server was put as singular in our model

    db.session.commit()

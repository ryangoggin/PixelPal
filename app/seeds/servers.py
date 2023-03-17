from app.models import db, User, Server, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import User


# Adds a demo server, you can add other servers here if you want
def seed_servers():
    servers = [
        # Server(
        #     owner_id=1, #Demo
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=2, #Marnie
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=3, #Bobbie
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=4,
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=5,
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=6,
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=7,
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),
        # Server(
        #     owner_id=8,
        #     name="Direct Messages",
        #     server_picture='https://i.redd.it/6jupfeilyhx71.jpg'
        # ),

        Server(
            owner_id=1,
            name="App Academy",
            server_picture=''
        ),

        Server(
            owner_id=4,
            name="Pixel Pals Rock",
            server_picture='https://as1.ftcdn.net/v2/jpg/02/73/11/70/1000_F_273117019_vWscsZD1nCUdTYkEyAvClQgLpFYExN5j.jpg'
        ),


    ]

    users = User.query.all()


    # first_group = list(users) #demo bobbie marnie
    # second_group = list(users[0:3]) #demo bobbie marnie ak


    servers[0].members.extend(users)
    servers[1].members.extend(users)


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

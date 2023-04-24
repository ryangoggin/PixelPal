from app.models import db, User, Server, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import User


# Adds a demo server, you can add other servers here if you want
def seed_servers():
    servers = [

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


        #DM Servers for Demo
        #3 Demo + Marnie
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #4 Demo and Bobbie
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #5 Demo and Aileen
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #6 Demo and Zaineb
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #7 Demo and Ken
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #8 Demo and Ryan
        Server(
            owner_id=1,
            name='DM',
            server_picture = ''
        ),

        #DM Servers for Marnie
        #9 Marnie and Bobbie
        Server(
            owner_id=2,
            name='DM',
            server_picture = ''
        ),

        #10 Marnie and Aileen
        Server(
            owner_id=2,
            name='DM',
            server_picture = ''
        ),

        #11 Marnie and Zaineb
        Server(
            owner_id=2,
            name='DM',
            server_picture = ''
        ),

        #12 Marnie and Ryan
        Server(
            owner_id=2,
            name='DM',
            server_picture = ''
        ),

        #13 Marnie and Ken
        Server(
            owner_id=2,
            name='DM',
            server_picture = ''
        ),


    ]

    users = User.query.all()

    servers[0].members.extend(users)
    servers[1].members.extend(users)

    #DMs for Demo
    # servers[2].members.extend([users[0], users[1]]) #Marnie
    # servers[3].members.extend([users[0], users[2]]) #Bobbie
    # servers[4].members.extend([users[0], users[3]]) #AK
    # servers[5].members.extend([users[0], users[4]]) #ZM
    # servers[6].members.extend([users[0], users[5]]) #RG
    # servers[7].members.extend([users[0], users[6]]) #KL

    # #DMs for Marnie
    # servers[8].members.extend([users[1], users[2]]) #Bobbie
    # servers[9].members.extend([users[1], users[3]]) #AK
    # servers[10].members.extend([users[1], users[4]]) #ZM
    # servers[11].members.extend([users[1], users[5]]) #RG
    # servers[12].members.extend([users[1], users[6]]) #RG

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

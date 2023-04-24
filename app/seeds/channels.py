from app.models import db, environment, SCHEMA
from app.models.channel import Channel
from sqlalchemy.sql import text


def seed_channels():
    channels = [
    Channel(name='General Discussion', server_id=1),
    Channel(name='Random',server_id=1),
    Channel(name='Announcements', server_id=1 ),
    Channel(name='General',server_id=2),
    Channel(name='Help Channel',server_id=2),
    Channel(name='Movie Discussions',server_id=2),

    #DM Channels Demo
    Channel(name='DM', server_id=3), #Demo + Marnie
    Channel(name='DM', server_id=4), #Demo + Bobbie
    Channel(name='DM', server_id=5), #Demo + Aileen
    Channel(name='DM', server_id=6), #Demo + Zaineb
    Channel(name='DM', server_id=7), #Demo + Ken
    Channel(name='DM', server_id=8), #Demo + Ryan

    #DM Channels Marnie
    Channel(name='DM', server_id=9), #Marnie + Bobbie
    Channel(name='DM', server_id=10), # Marnie + Aileen
    Channel(name='DM', server_id=11), # Marnie + Zaineb
    Channel(name='DM', server_id=12), #Marnie + Ryan
    Channel(name='DM', server_id=13), #Marnie + Ken

    ]

    db.session.add_all(channels)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()

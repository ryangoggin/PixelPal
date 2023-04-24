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

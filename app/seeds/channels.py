from app.models import db, environment, SCHEMA
from app.models.channel import Channel
from sqlalchemy.sql import text


def seed_channels():
    channel1 = Channel(
        name='general',
        description='General discussion'
    )

    channel2 = Channel(
        name='announcements',
        description='Important announcements'
    )

    channel3 = Channel(
        name='random',
        description='Random discussions'
    )

    db.session.add_all([channel1, channel2, channel3])
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

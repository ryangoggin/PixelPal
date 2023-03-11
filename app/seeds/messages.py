from app.models import db, environment, SCHEMA
from app.models.message import Message
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    # ADD CHANNEL_ID BACK IN ONCE CHANNEL MODEL MADE
    message1 = Message(
        content='Hey what\'s up?', user_id=1, channel_id=1)
    message2 = Message(
        content='Nothing much, wbu?', user_id=2, channel_id=1)
    message3 = Message(
        content='Oh wow a new channel, nice', user_id=1, channel_id=2)

    db.session.add_all([message1, message2, message3])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()

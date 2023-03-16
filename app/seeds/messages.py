from app.models import db, environment, SCHEMA
from app.models.message import Message
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    messages = [
    #Channel 1 General, Server 1 App Academy 1-5
    Message(
        content='Hey what\'s up?', user_id=1, channel_id=1),
    Message(
        content='Nothing much, wbu?', user_id=2, channel_id=1),
    Message(
        content='Hey! This homework is super hard isn\'t it? ', user_id=3, channel_id=1),
    Message(
        content='Do you need any help?', user_id=1, channel_id=1),
    Message(
        content='Yeah! That would be great. Thanks :)', user_id=3, channel_id=1),

    #Channel 2 Random Discussion, Server 1 App Academy 6-10
    Message(
        content='Did you guys see that new movie, Avatar? It was amazing.', user_id=3, channel_id=2),
    Message(
        content='No! Not yet. I would love to see it after class this Friday!', user_id=1, channel_id=2),
    Message(
        content='I\'m down. I haven\'t seen it yet either!', user_id=2, channel_id=2),
    Message(
        content='Great! Let\'s see the 9PM viewing on Friday', user_id=1, channel_id=2,),
    Message(
        content='Sounds good!', user_id=2, channel_id=2,),


    #Channel 1 General in Server 2 PixelPals 11-15
    Message(
        content='Hey guys! How is everyone doing. Welcome to my new server!', user_id=4, channel_id=4),
    Message(
        content='Thanks for the add! I\'m so excited to be a Pixel Pal :D', user_id=5, channel_id=4),
    Message(
        content='Same here! This is such a cool app.', user_id=6, channel_id=4),
    Message(
        content='Let me know if you guys want me to add any relevant channels! Or you can do it yourself also!', user_id=4, channel_id=4),
    Message(
        content='Got it!', user_id=6, channel_id=4),

    #Channel 2 Help in Server 2 PixelPals 16-23
    Message(
        content='Hey guys! I have a question about the homework from class today', user_id=6, channel_id=5),
    Message(
        content='I can help!', user_id=7, channel_id=5),
    Message(
        content='That would be great. Do you remember when it\'s due?', user_id=6, channel_id=5),
    Message(
        content='It\'s due this coming Monday.', user_id=7, channel_id=5),
    Message(
        content='Yikes! That\'s soon.', user_id=6, channel_id=5),
    Message(
        content='I thought it was due on Tuesday?', user_id=5, channel_id=5),
    Message(
        content='Oops, my bad. Yeah it\'s due on Tuesday!', user_id=5, channel_id=5),
    Message(
        content='Got it. Now... on to the question 1...', user_id=6, channel_id=5),

    ]

    db.session.add_all(messages)
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

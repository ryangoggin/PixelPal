from app.models import db, environment, SCHEMA
from app.models import PrivateMessage
from sqlalchemy.sql import text


def seed_private_messages():
    private_messages = [

    # #DM Channels
    # #Demo DMs
    PrivateMessage(name="@Marnie", serverId=1, user_id=1, chatting_id=2 ),
    PrivateMessage(name="@Bobbie", serverId=1, user_id=1, chatting_id=3 ),
    PrivateMessage(name="@akim", serverId=1, user_id=1, chatting_id=4),

    # # Marnie DMs
    PrivateMessage(name="@Demo", serverId=2, user_id=2, chatting_id=1),
    PrivateMessage(name="@Bobbie", serverId=2, user_id=3, chatting_id=3),

    # #Bobbie DMs
    PrivateMessage(name="@Demo", serverId=3, user_id=3, chatting_id=1),
    PrivateMessage(name="@Marnie", serverId=3, user_id=3, chatting_id=2),

    # #AK DMs
    PrivateMessage(name="@Demo", serverId=4, user_id=4, chatting_id=1),
    PrivateMessage(name="@zmarediya", serverId=4, user_id=4, chatting_id=5),
    PrivateMessage(name="@rgoggin", serverId=4,user_id=4, chatting_id=6),
    PrivateMessage(name="@kleong", serverId=4, user_id=4, chatting_id=7),

    # #ZM DMs
    PrivateMessage(name="@akim", serverId=5, user_id=5, chatting_id=4),
    PrivateMessage(name="@rgoggin", serverId=5, user_id=5, chatting_id=6),

    # #RG DMs
    PrivateMessage(name="@akim", serverId=6, user_id=6, chatting_id=4),
    PrivateMessage(name="@zmarediya", serverId=6, user_id=6, chatting_id=5),

    # #KL DMs
    PrivateMessage(name="@akim", serverId=7, user_id=7, chatting_id=4),

    ]




    db.session.add_all(private_messages)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_private_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.private_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM private_messages"))

    db.session.commit()

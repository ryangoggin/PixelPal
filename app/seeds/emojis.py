from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.emoji import Emoji

def seed_emojis():
    emojis = [
        Emoji(name='smile', url='0x1F642'),
        Emoji(name='grinning', url='0x1F604'),
        Emoji(name='joy', url='0x1F602'),
        Emoji(name='melting_face', url='0x1FAE0'),
        Emoji(name='affection', url='0x1F970'),
        Emoji(name='heart_eyes', url='0x1F60D'),
        Emoji(name='innocent', url='0x1F607'),
        Emoji(name='sad', url='0x2639'),
        Emoji(name='tears', url='0x1F622'),
        Emoji(name='crying', url='0x1F62D'),
        Emoji(name='angry', url='0x1F621'),
        Emoji(name='furious', url='0x1F92C'),
        Emoji(name='surprised', url='0x1F631'),
        Emoji(name='shocked', url='0x1F626'),
        Emoji(name='clown', url='0x1F921'),
        Emoji(name='heart_arrow', url='0x1F498'),
        Emoji(name='one_hundred', url='0x1F4AF'),
        Emoji(name='wave', url='0x1F44B')
    ]

    db.session.add_all(emojis)
    db.session.commit()



def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.emojis RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM emojis"))

    db.session.commit()

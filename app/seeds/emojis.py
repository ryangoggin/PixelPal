from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.emoji import Emoji

def seed_emojis():
    emojis = [
        #1-5
        Emoji(name='smile', url='0x1F642'),
        Emoji(name='grinning', url='0x1F604'),
        Emoji(name='joy', url='0x1F602'),
        Emoji(name='melting_face', url='0x1FAE0'),
        Emoji(name='affection', url='0x1F970'),

        #6-10
        Emoji(name='heart_eyes', url='0x1F60D'),
        Emoji(name='innocent', url='0x1F607'),
        Emoji(name='sad', url='0x1F630'),
        Emoji(name='tears', url='0x1F622'),
        Emoji(name='crying', url='0x1F62D'),

        #11-15
        Emoji(name='angry', url='0x1F621'),
        Emoji(name='furious', url='0x1F92C'),
        Emoji(name='surprised', url='0x1F631'),
        Emoji(name='shocked', url='0x1F626'),
        Emoji(name='ghost', url='0x1F47B'),

        #16-20
        Emoji(name='yawning', url='0x1F971'),
        Emoji(name='clown', url='0x1F921'),
        Emoji(name='heart_arrow', url='0x1F498'),
        Emoji(name='kiss', url='0x1F48B'),
        Emoji(name='one_hundred', url='0x1F4AF'),

        #21-25
        Emoji(name='wave', url='0x1F44B'),
        Emoji(name='devil', url='0x1F608'),
        Emoji(name='skull', url='0x1F480'),
        Emoji(name='poop', url='0x1F4A9'),
        Emoji(name='thumbs-up', url='0x1F44D'),

    ]

    db.session.add_all(emojis)
    db.session.commit()



def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.emojis RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM emojis"))

    db.session.commit()

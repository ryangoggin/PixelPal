from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.emoji import Emoji

def seed_emojis():
    smile = Emoji(name='smile', url="0x1F642")
    grinning = Emoji(name='grinning', url='0x1F604')
    joy = Emoji(name='joy', url='0x1F602')
    melting_face = Emoji(name='melting_face', url='0x1FAE0')
    affection = Emoji(name='affection', url='0x1F970')
    heart_eyes = Emoji(name='heart_eyes', url='0x1F60D')
    innocent = Emoji(name='innocent', url='0x1F607')
    sad = Emoji(name='sad', url='0x2639')
    tears = Emoji(name='tears', url='0x1F622')

    crying = Emoji(name='crying', url='0x1F62D')
    angry = Emoji(name='angry', url='0x1F621')
    furious = Emoji(name='furious', url='0x1F92C')
    surprised = Emoji(name='surprised', url='0x1F631')
    shocked = Emoji(name='shocked', url='0x1F626')
    clown = Emoji(name='clown', url='0x1F921')
    heart_arrow = Emoji(name='heart_arrow', url='0x1F498')
    one_hundred = Emoji(name='one_hundred', url='0x1F4AF')
    wave = Emoji(name='wave', url='0x1F44B')


    seed_emojis = [smile, grinning, joy, melting_face, affection, heart_eyes,
                   innocent, sad, tears, crying,
                   angry, furious, surprised, shocked,
                   clown, heart_arrow, one_hundred, wave]

    for emoji in seed_emojis:
        db.session.add(emoji)
    db.session.commit()


def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM emojis"))

    db.session.commit()

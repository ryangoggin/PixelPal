from app.models import db, Emoji, environment, SCHEMA
from sqlalchemy.sql import text

def seed_emojis():
    smile = Emoji(name='smile', url='testingurl')
    grinning = Emoji(name='grinning', url='testingurl')
    joy = Emoji(name='joy', url='testingurl')
    melting_face = Emoji(name='melting_face', url='testingurl')
    innocent = Emoji(name='melting_face', url='testingurl')
    # do more research ... how should i incorporate these emojis?

    seed_emojis = [smile, grinning, joy, melting_face, innocent]

    for emoji in seed_emojis:
        db.session.add(emoji)
    db.session.commit()


def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM emojis"))

    db.session.commit()

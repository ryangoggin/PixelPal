from app.models import db, Emoji, environment, SCHEMA
from sqlalchemy.sql import text
import emoji

def seed_emojis():
    smile = Emoji(name='smile', url="\U0001F642") #
    grinning = Emoji(name='grinning', url='\U0001F604')
    joy = Emoji(name='joy', url='\U0001F602')
    melting_face = Emoji(name='melting_face', url='\U0001FAE0')
    affection = Emoji(name='affection', url='\U0001F970')
    heart_eyes = Emoji(name='heart_eyes', url='\U0001F60D')
    innocent = Emoji(name='melting_face', url='\U0001F607')
    sad = Emoji(name='sad', url='testingurl')
    tears = Emoji(name='tears', url='testingurl')
    crying = Emoji(name='crying', url='testingurl')
    angry = Emoji(name='angry', url='testingurl')
    furious = Emoji(name='furious', url='testingurl')
    surprised = Emoji(name='surprised', url='testingurl')
    shocked = Emoji(name='surprised', url='testingurl')
    # do more research ... how should i incorporate these emojis?

    seed_emojis = [smile, grinning, joy, melting_face, affection, heart_eyes,
                   innocent, sad, tears, crying,
                   angry, furious, surprised, shocked]

    for emoji in seed_emojis:
        db.session.add(emoji)
    db.session.commit()


def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM emojis"))

    db.session.commit()

from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.reaction import Reaction

def seed_reactions():
    reactions = [
    Reaction(userId=2, emojiId=21, messageId=1), #wave
    Reaction(userId=3, emojiId=1, messageId=1), #smile
    Reaction(userId=1, emojiId=25, messageId=5), #thumbs up

    Reaction(userId=1, emojiId=25, messageId=10), #thumbs up
    Reaction(userId=1, emojiId=25, messageId=10), #thumbs up

    Reaction(userId=4, emojiId=18, messageId=12), #heart
    Reaction(userId=4, emojiId=18, messageId=13),

    Reaction(userId=6, emojiId=15, messageId=19), #fear
    Reaction(userId=6, emojiId=3, messageId=23), #joy

    ]

    db.session.add_all(reactions)
    db.session.commit()



def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()

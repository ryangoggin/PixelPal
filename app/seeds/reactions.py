from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.reaction import Reaction

def seed_reactions():
    react_1 = Reaction(userId=2, emojiId=17, messageId=3) #Marnie
    react_2 = Reaction(userId=2, emojiId=18, messageId=1) #Marnie
    react_3 = Reaction(userId=3, emojiId=4, messageId=2) #Bobbie
    react_4 = Reaction(userId=3, emojiId=6, messageId=3) #Bobbie

    db.session.add_all([react_1, react_2, react_3, react_4])
    db.session.commit()



def undo_emojis():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()

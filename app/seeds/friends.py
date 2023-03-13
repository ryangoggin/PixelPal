from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.friend import Friend

def seed_friends():
    friend1 = Friend(userId=1, friendId=2)
    friend2 = Friend(userId=1, friendId=3)
    friend3 = Friend(userId=4, friendId=5)
    friend4 = Friend(userId=4, friendId=6)
    friend5 = Friend(userId=4, friendId=7)

    db.session.add_all([friend1, friend2, friend3, friend4, friend5])
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()

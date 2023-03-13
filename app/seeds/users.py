from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():


    users = [
    User(username='Demo#1234', email='demo@aa.io', password='password'),
    User(username='marnie#2345', email='marnie@aa.io', password='password'),
    User(username='bobbie#2121', email='bobbie@aa.io', password='password'),
    User(username='akim#7070', email='aileenkim@gmail.com', password='password1'),
    User(username='zmarediya#0206', email='zainebmarediya@gmail.com', password='password2'),
    User(username='rgoggin#0001', email='ryangoggin@gmail.com', password='password3'),
    User(username='kleong#0666', email='kenleong@gmail.com', password='password4')
    ]

    db.session.add_all(users)
    db.session.commit()
    return users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

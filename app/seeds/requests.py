from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Request

def seed_requests():
    requests = [

    #AK 4
    Request(sender_id=4, receiver_id=2),
    #ZM 5
    Request(sender_id=5, receiver_id=2),
    #KL Friends 7
    Request(sender_id=7, receiver_id=2),
    ]

    db.session.add_all(requests)
    db.session.commit()

def undo_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requests"))

    db.session.commit()

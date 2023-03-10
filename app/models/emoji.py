from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Emoji(db.Model):
    __tablename__ = 'emojis'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    url = db.Column(db.String(100), nullable=False, unique=True)

    # RELATIONSHIPS WITH FOREIGN KEYS

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url
        }


class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    #userId = db.Column()
    #emojiId
    #messageId

    def to_dict(self):
        return {
            'id': self.id,
            #'userId': self.name,
            #'emojiId': self.url
        }

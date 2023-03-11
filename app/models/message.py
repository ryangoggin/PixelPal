from .db import db, environment, SCHEMA
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)

    # # relationship attributes
    # reactions = db.relationship('Reaction', backref='message', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp,
            "userId": self.user_id,
            # "channelId": self.channel_id,
            # "reactions": [reaction.to_dict() for reaction in self.reactions]
        }

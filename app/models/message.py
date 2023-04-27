from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')))
    private_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('private_channels.id')))

    #Relationship Attribute
    reactions = db.relationship('Reaction', back_populates='message', lazy=True, cascade="all, delete")
    private_channels = db.relationship("PrivateChannel", back_populates='messages', lazy=True)
    user = db.relationship("User", back_populates='message', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp,
            "userId": self.user_id,
            "channelId": self.channel_id,
            'user': self.user.to_dict(),
            "reactions": [reaction.to_dict() for reaction in self.reactions]
        }

    def to_dict_dm(self):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp,
            "userId": self.user_id,
            "private_id": self.private_id,
            'user': self.user.to_dict(),
            "reactions": [reaction.to_dict() for reaction in self.reactions]
        }

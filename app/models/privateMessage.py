from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('server.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    chatting_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)

    messages = db.relationship('Message', backref='private_messages', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "serverId": self.server_id,
            'members': {'user': self.user_id, 'pixelPal': self.chatting_user_id},
            'messages': [message.to_dict() for message in self.messages]
        }

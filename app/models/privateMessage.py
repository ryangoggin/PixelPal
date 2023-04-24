from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    chatting_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)

    #Relationship Attributes
    messages = db.relationship('Message', back_populates='private_messages', lazy=True, cascade='all, delete-orphan')
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    user_two = db.relationship("User", lazy=True, foreign_keys=[chatting_id])


    def to_dict(self):
        return {
            "id": self.id,
            'user': self.user.to_dict(),
            'userTwo': self.user_two.to_dict(),
            'messages': [message.to_dict() for message in self.messages]
        }

    def to_dict_no_message(self):
        return {
            "id": self.id,
            'user': self.user.to_dict(),
            'userTwo': self.user_two.to_dict(),
        }

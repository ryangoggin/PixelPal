from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PrivateChannel(db.Model):
    __tablename__ = 'private_channels'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_two_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #Relationship Attributes
    messages = db.relationship('Message', back_populates='private_channels', lazy=True, cascade='all, delete-orphan')
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    user_two = db.relationship("User", lazy=True, foreign_keys=[user_two_id])



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
    def get_other_user(self, user_id):
        if user_id == self.user_id:
            return self.user_two
        else:
            return self.user

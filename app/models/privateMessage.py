# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime


# class PrivateMessage(db.Model):
#     __tablename__ = 'private_messages'


#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
#     friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)

#     messages = db.relationship('Message', back_populates='private_message', lazy=True, cascade='all, delete')
#     user = db.relationship("User", lazy=True, foreign_keys =[user_id])
#     friend = db.relationship("User", lazy=True, foreign_keys=[friend_id])

#     def to_dict(self):
#         return {
#             "id": self.id,
#             'userId': self.user_id,
#             'friendId': self.friend_id,
#             'user': self.user.to_dict(),
#             'friend': self.friend.to_dict(),
#             'messages': [message.to_dict() for message in self.messages]
#         }

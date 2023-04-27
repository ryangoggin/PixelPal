from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    friendId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    friend_user = db.relationship('User', foreign_keys=[friendId], lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'friendId': self.friendId,
            'userId': self.userId,
            'friendUser': self.friend_user.to_dict()
        }

    def to_username(self):
        return self.friend_user.username

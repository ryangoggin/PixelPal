from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Pending')

    #Relationship attributes
    user = db.relationship('User', lazy=False, foreign_keys=[user_id])
    friend = db.relationship('User', lazy=False, foreign_keys=[friend_id])


    def to_dict(self):
        return {
            'id': self.id,
            'friendId': self.friend_id,
            'userId': self.user_id,
            'friend': self.friend.to_dict(),
            'user': self.user.to_dict()
        }

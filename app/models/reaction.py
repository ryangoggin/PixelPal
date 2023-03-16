from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    emojiId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('emojis.id')), nullable=False)
    messageId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)

    emoji = db.relationship('Emoji', backref='reactions', lazy=True, cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'messageId': self.messageId,
            'emoji': self.emoji.to_dict()
        }

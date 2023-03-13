from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    emojiId = db.Column(db.Integer, db.ForeignKey('emojis.id'))
    messageId = db.Column(db.Integer, db.ForeignKey('messages.id'))

    #Relationship Attributes
    user = db.relationship('User', backref='user', lazy=False)
    emojis = db.relationship('Emoji', backref='reactions', lazy=True)
    messages = db.relationship('Message', backref='message', lazy=True)

    # when querying do we want to see the actual emoji?

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'emojiId': self.emojiId,
            'messageId': self.messageId
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    emojiId = db.Column(db.Integer, db.ForeignKey('emojis.id'), nullable=False)
    messageId = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)

    #Relationship Attributes
    # emojis = db.relationship('Emoji', backref='reactions', lazy=True)
    # message = db.relationship('Message', backref='reactions', lazy=True)
    # users = db.relationship("User", backref='reactions', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'emojiId': self.emojiId,
            'messageId': self.messageId
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Emoji(db.Model):
    __tablename__ = 'emojis'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    url = db.Column(db.String(100), nullable=False, unique=True)

    #Relationship Attributes
    # reactions = db.relationship("Reaction", back_populates='emojis', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url
        }

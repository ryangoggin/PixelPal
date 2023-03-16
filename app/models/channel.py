from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('server.id')), nullable=False)

    #Relationship Attributes
    messages = db.relationship('Message', backref='channel', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "serverId": self.server_id,
            "messages": [message.to_dict() for message in self.messages],
        }

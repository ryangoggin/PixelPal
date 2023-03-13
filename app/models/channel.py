from .db import db, environment, SCHEMA
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    messages = db.relationship('Message', backref='channel', lazy=True, cascade='all, delete')
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "messages": [message.to_dict() for message in self.messages],
            "serverId": self.server_id
        }

from .db import db, environment, SCHEMA
from datetime import datetime
# from .user import User

server_members = db.Table('server_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('server.id'), primary_key=True)
)

class Server(db.Model):
    __tablename__ = 'server'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    # channels = db.relationship('Channel', backref='server', lazy=True)
    members = db.relationship('User', secondary='server_members', back_populates='servers')
    server_picture = db.Column(db.String(120))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "owner_id": self.owner_id,
            # "channels": [channel.to_dict() for channel in self.channels],
            "members": [member.to_dict() for member in self.members],
            "server_picture": self.server_picture
        }
    

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from .user import User


class Server(db.Model):
    __tablename__ = 'server'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    server_picture = db.Column(db.String(500))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #Relationship Attributes
    channels = db.relationship('Channel', backref='server', lazy=True, cascade='all, delete-orphan')
    members = db.relationship('User', secondary='server_members', back_populates='servers', cascade='all, delete')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "server_picture": self.server_picture,
            "channels": [channel.to_dict() for channel in self.channels],
            "members": [member.to_dict() for member in self.members],
        }


#Join Table
server_members = db.Table('server_members',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey(add_prefix_for_prod('server.id')), primary_key=True)
)
if environment == "production":
    server_members.schema = SCHEMA

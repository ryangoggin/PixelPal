from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()




class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    profile_pic = db.Column(db.String(120))
    servers = db.relationship('Server', secondary='server_members', backref='members')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "passwordHash": self.passwordHash,
            "profilePic": self.profilePic,
            "servers": [server.to_dict() for server in self.servers],
            "createdAt": self.createdAt
        }

class Channel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    messages = db.relationship('Message', backref='channel', lazy=True)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "messages": [message.to_dict() for message in self.messages],
            "serverId": self.serverId
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channel.id'), nullable=False)
    emojis = db.relationship('EmojiReaction', backref='message', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp,
            "userId": self.userId,
            "channelId": self.channelId,
            "emojis": [emoji.to_dict() for emoji in self.emojis]
        }

class EmojiReaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "messageId": self.messageId
        }

class Server(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    channels = db.relationship('Channel', backref='server', lazy=True)
    members = db.relationship('User', secondary='server_members', backref='servers')
    server_picture = db.Column(db.String(120))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ownerId": self.ownerId,
            "channels": [channel.to_dict() for channel in self.channels],
            "members": [member.to_dict() for member in self.members],
            "serverPicture": self.serverPicture
        }

class FriendList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mutual = db.Column(db.Boolean, default=False, nullable=False)

    user = db.relationship('User', foreign_keys=[user_id], backref=db.backref('friends', lazy=True))
    friend = db.relationship('User', foreign_keys=[friend_id])

    __table_args__ = (
        db.UniqueConstraint('user_id', 'friend_id', name='unique_friend'),
    )
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'friendId': self.friend_id,
            'mutual': self.mutual,
        }

server_members = db.Table('server_members',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('server.id'), primary_key=True)
)

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


class Channel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    messages = db.relationship('Message', backref='channel', lazy=True)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channel.id'), nullable=False)

class Server(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    channels = db.relationship('Channel', backref='server', lazy=True)
    members = db.relationship('User', secondary='server_members', backref='servers')
    server_picture = db.Column(db.String(120))


server_members = db.Table('server_members',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('server.id'), primary_key=True)
)

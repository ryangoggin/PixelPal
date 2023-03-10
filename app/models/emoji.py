# MODELS
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Emoji(db.Model):
    __tablename__ = 'emojis'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    url = db.Column(db.String(255), nullable=False, unique=True)


    def to_dict(self):

from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Emoji

emoji_routes = Blueprint('emojis', __name__)

@emoji_routes.route("/")
@login_required
def get_all_emojis():
    ''' query for all emojis and return them in a list of dictionaries'''

    emojis = Emoji.query.all()

    return {'emojis': [emoji.to_dict() for emoji in emojis]}

@emoji_routes.route("/<int:id>")
@login_required
def emoji(id):
    ''' query for an id and returns that emoji in a dictionary '''
    emoji = Emoji.query.get(int(id))
    return emoji.to_dict()

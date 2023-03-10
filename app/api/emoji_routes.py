from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

emoji_routes = Blueprint('emojis', __name__)

@emoji_routes.route("/")
@login_required
def get_all_emojis():
    ''' query for all emojis and returns them in a list of dictionaries'''

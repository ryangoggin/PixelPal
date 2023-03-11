from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db
from app.models.emoji import Emoji, Reaction
from app.models.user import User

emoji_routes = Blueprint('emojis', __name__)

@emoji_routes.route("/", methods=["GET"])
@login_required
def get_all_emojis():
    ''' query for all emojis and return them in a list of dictionaries'''

    emojis = Emoji.query.all()

    return jsonify({'emojis': [emoji.to_dict() for emoji in emojis]}), 200


@emoji_routes.route("/", methods=["POST"])
@login_required
def create_reaction(messageId, emojiId, userId):
    ''' create new reaction to a message'''
    # query current user and get user id ?? or we can just get it
    # current_user = User.query.get(id) #??

    # data = request.get_json()

    # name = data.get("name")
    # url = data.get("url")
    # message_id = data.get("message_id")

    #create a new reaction
    new_reaction = Reaction(messageId, emojiId, userId)

    db.session.add()
    db.session.commit(new_reaction)

    return jsonify(new_reaction.to_dict()), 201


@emoji_routes.route("/<int:id>")
@login_required
def get_emoji(id):
    ''' query for an id and returns that emoji in a dictionary '''
    emoji = Emoji.query.get(int(id))
    return emoji.to_dict()


@emoji_routes.route("/<int:id>")
@login_required
def delete_reaction(id):
    reaction = Reaction.query.get(int(id))
    db.session.delete(reaction)
    db.session.commit()
    return jsonify("Reaction succcessfully deleted"), 201

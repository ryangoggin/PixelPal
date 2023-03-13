from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.emoji import Emoji
from app.models.reaction import Reaction
# from app.models.user import User

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

    #create a new reaction
    new_reaction = Reaction(messageId, emojiId, userId)

    db.session.add(new_reaction)
    db.session.commit()

    return jsonify(new_reaction.to_dict()), 201


@emoji_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_emoji(id):
    ''' query for an id and returns that emoji in a dictionary '''
    emoji = Emoji.query.get(int(id))
    return jsonify(emoji.to_dict()), 200



@emoji_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_reaction(id):
    ''' remove a reaction from a message'''
    reaction = Reaction.query.get(int(id))

    #can only delete a reaction if you are the creator of that reaction
    if reaction.userId == current_user.id:
        db.session.delete(reaction)
        db.session.commit()
        return jsonify("Reaction succcessfully deleted"), 200
    else:
        return jsonify("You are not authorized to remove this reaction"), 401

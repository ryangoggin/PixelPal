from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.emoji import Emoji
from app.models.reaction import Reaction

emoji_routes = Blueprint('emojis', __name__)

#GET All Emojis /emojis
@emoji_routes.route("", methods=["GET"])
@login_required
def get_all_emojis():
    ''' query for all emojis and return them in a list of dictionaries'''

    emojis = Emoji.query.all()

    return jsonify({'emojis': [emoji.to_dict() for emoji in emojis]}), 200


#POST reaction to a message /emojis
@emoji_routes.route("", methods=["POST"])
@login_required
def create_reaction():
    ''' create new reaction to a message'''
    data = request.get_json()

    new_reaction = Reaction(messageId=data['messageId'], emojiId=data['emojiId'], userId=data['userId'])

    db.session.add(new_reaction)
    db.session.commit()

    return jsonify(new_reaction.to_dict()), 201


#GET emoji by ID /emojis/:id
@emoji_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_emoji(id):
    ''' query for an id and returns that emoji in a dictionary '''
    emoji = Emoji.query.get(int(id))
    return jsonify(emoji.to_dict()), 200

#DELETE reaction
@emoji_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_reaction(id):
    ''' remove a reaction from a message'''

    reaction = Reaction.query.get(id)
    db.session.delete(reaction)
    db.session.commit()
    return jsonify("Reaction succcessfully deleted"), 200


#POST emoji
@emoji_routes.route("", methods=["POST"])
@login_required
def create_emoji():

    data = request.get_json()

    new_emoji = Emoji(name=data['name'], url=data['url'])

    db.session.add(new_emoji)
    db.session.commit()

    return jsonify(new_emoji.to_dict()), 201



# @emoji_routes.route("/reactions/<int:id>", methods=["GET"])
# @login_required
# def find_reaction(id):
#     reaction = Reaction.query.get(id)
#     return reaction.to_dict()

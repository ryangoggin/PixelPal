from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.emoji import Emoji
from app.models.reaction import Reaction

emoji_routes = Blueprint('emojis', __name__)

@emoji_routes.route("/", methods=["GET"])
# @login_required
def get_all_emojis():
    ''' query for all emojis and return them in a list of dictionaries'''

    emojis = Emoji.query.all()

    return jsonify({'emojis': [emoji.to_dict() for emoji in emojis]}), 200


@emoji_routes.route("/", methods=["POST"])
# @login_required
def create_reaction():

    ''' create new reaction to a message'''
    data = request.get_json()
    messageId = data['messageId']
    emojiId = data['emojiId']
    userId = data['userId']
    # userId = current_user.id

    # how to get current userId?
    #looks like current_user = anon mixin

    #edge case: if the current user has already created a reaction with the same emojiId then you cannot create it
    # reaction_exists = Reaction.query.filter(Reaction.emojiId == emojiId)
    # if current_user.id == reaction_exists.userId and reaction_exists:
    #     return jsonify("You cannot create another reaction with the same emoji")

    # else:
        #When creating a new reaction, if most of these are foreign keys
        # how are we supposed to input this info in order to create the new reaction?
    new_reaction = Reaction(messageId, emojiId, userId)
    db.session.add(new_reaction)
    db.session.commit()

    return jsonify("Reaction successfully created!")
    # return jsonify(new_reaction.to_dict()), 201


@emoji_routes.route("/<int:id>", methods=["GET"])
# @login_required
def get_emoji(id):
    ''' query for an id and returns that emoji in a dictionary '''
    emoji = Emoji.query.get(int(id))
    return jsonify(emoji.to_dict()), 200



@emoji_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
def delete_reaction(reactionId):
    ''' remove a reaction from a message'''

    reaction = Reaction.query.get(int(reactionId))
    #if reaction not found
    if reaction == None:
        return jsonify("Cannot find reaction")
    else:
        #need to be currently logged in and userId of that reaction
        if reaction.userId == current_user.id:
            db.session.delete(reaction)
            db.session.commit()
            return jsonify("Reaction succcessfully deleted"), 200
        else:
            return jsonify("You are not authorized to remove this reaction"), 401

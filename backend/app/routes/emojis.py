from flask import jsonify, request, Blueprint
from app.models.models import db, EmojiReaction

# create a blueprint for emoji reactions routes
emojis_bp = Blueprint('emojis', __name__)

# route to get all emoji reactions
# GET /emojis - get all emoji reactions
@emojis_bp.route('/', methods=['GET'])
def get_all_emoji_reactions():
    # get all emoji reactions from the database
    emojis = EmojiReaction.query.all()
    # convert each emoji reaction to a dictionary and return as JSON
    return jsonify([emoji.to_dict() for emoji in emojis]), 200

# route to create a new emoji reaction
# POST /emojis - create a new emoji reaction
@emojis_bp.route('/', methods=['POST'])
def create_emoji_reaction():
    # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    url = data.get('url')
    message_id = data.get('message_id')

    # create a new emoji reaction object
    emoji = EmojiReaction(name=name, url=url, message_id=message_id)
    # add the emoji reaction to the database
    db.session.add(emoji)
    db.session.commit()

    # return the new emoji reaction as JSON
    return jsonify(emoji.to_dict()), 201

# route to get a specific emoji reaction by ID
# GET /emojis/:id - get a specific emoji reaction by ID
@emojis_bp.route('/<int:id>', methods=['GET'])
def get_emoji_reaction(id):
    # get the emoji reaction from the database by ID
    emoji = EmojiReaction.query.get(id)
    # if the emoji reaction doesn't exist, return an error message
    if emoji is None:
        return jsonify({'error': 'Emoji reaction not found'}), 404

    # otherwise, return the emoji reaction as JSON
    return jsonify(emoji.to_dict()), 200

# route to update a specific emoji reaction by ID
# PUT /emojis/:id - update a specific emoji reaction by ID

@emojis_bp.route('/<int:id>', methods=['PUT'])
def update_emoji_reaction(id):
    # get the emoji reaction from the database by ID
    emoji = EmojiReaction.query.get(id)
    # if the emoji reaction doesn't exist, return an error message
    if emoji is None:
        return jsonify({'error': 'Emoji reaction not found'}), 404

    # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    url = data.get('url')
    message_id = data.get('message_id')

    # update the emoji reaction object with the new data
    emoji.name = name or emoji.name
    emoji.url = url or emoji.url
    emoji.message_id = message_id or emoji.message_id

    # save the changes to the database
    db.session.commit()

    # return the updated emoji reaction as JSON
    return jsonify(emoji.to_dict()), 200

# route to delete a specific emoji reaction by ID
# DELETE /emojis/:id - delete a specific emoji reaction by ID

@emojis_bp.route('/<int:id>', methods=['DELETE'])
def delete_emoji_reaction(id):
    # get the emoji reaction from the database by ID
    emoji = EmojiReaction.query.get(id)
    # if the emoji reaction doesn't exist, return an error message
    if emoji is None:
        return jsonify({'error': 'Emoji reaction not found'}), 404

    # delete the emoji reaction from the database
    db.session.delete(emoji)
    db.session.commit()

    # return a message indicating that the emoji reaction was deleted
    return jsonify({'message': 'Emoji reaction deleted'}), 200

from flask import jsonify, request, Blueprint
from app.models.models import db, Message

# create a blueprint for messages routes
messages_bp = Blueprint('messages', __name__)

# route to get all messages
# GET /messages - get all messages
@messages_bp.route('/', methods=['GET'])
def get_all_messages():
    # get all messages from the database
    messages = Message.query.all()
    # convert each message to a dictionary and return as JSON
    return jsonify([message.to_dict() for message in messages]), 200

# route to create a new message
# POST /messages - create a new message

@messages_bp.route('/', methods=['POST'])
def create_message():
    # get the data from the request body
    data = request.get_json()
    content = data.get('content')
    user_id = data.get('user_id')
    channel_id = data.get('channel_id')

    # create a new message object
    message = Message(content=content, user_id=user_id, channel_id=channel_id)
    # add the message to the database
    db.session.add(message)
    db.session.commit()

    # return the new message as JSON
    return jsonify(message.to_dict()), 201

# route to get a specific message by ID
# GET /messages/:id - get a specific message by ID

@messages_bp.route('/<int:id>', methods=['GET'])
def get_message(id):
    # get the message from the database by ID
    message = Message.query.get(id)
    # if the message doesn't exist, return an error message
    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    # otherwise, return the message as JSON
    return jsonify(message.to_dict()), 200

# route to update a specific message by ID
# PUT /messages/:id - update a specific message by ID
@messages_bp.route('/<int:id>', methods=['PUT'])
def update_message(id):
    # get the message from the database by ID
    message = Message.query.get(id)
    # if the message doesn't exist, return an error message
    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    # get the data from the request body
    data = request.get_json()
    content = data.get('content')
    user_id = data.get('user_id')
    channel_id = data.get('channel_id')

    # update the message object with the new data
    message.content = content or message.content
    message.user_id = user_id or message.user_id
    message.channel_id = channel_id or message.channel_id

    # save the changes to the database
    db.session.commit()

    # return the updated message as JSON
    return jsonify(message.to_dict()), 200

# route to delete a specific message by ID
# DELETE /emojis/:id - delete a specific emoji reaction by ID
@messages_bp.route('/<int:id>', methods=['DELETE'])
def delete_message(id):
    # get the message from the database by ID
    message = Message.query.get(id)
    # if the message doesn't exist, return an error message
    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    # delete the message from the database
    db.session.delete(message)
    db.session.commit()

    # return a message indicating that the message was deleted
    return jsonify({'message': 'Message deleted'}), 200

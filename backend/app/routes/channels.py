from flask import jsonify, request, Blueprint
from app.models import db, Channel

# create a blueprint for channels routes
channels_bp = Blueprint('channels', __name__)

# route to get all channels
# GET /channels - get all channels
@channels_bp.route('/', methods=['GET'])
def get_all_channels():
    # get all channels from the database
    channels = Channel.query.all()
    # convert each channel to a dictionary and return as JSON
    return jsonify([channel.to_dict() for channel in channels]), 200

# route to create a new channel
# POST /channels - create a new channel
@channels_bp.route('/', methods=['POST'])
def create_channel():
    # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    server_id = data.get('server_id')

    # create a new channel object
    channel = Channel(name=name, description=description, server_id=server_id)
    # add the channel to the database
    db.session.add(channel)
    db.session.commit()

    # return the new channel as JSON
    return jsonify(channel.to_dict()), 201

# route to get a specific channel by ID
# GET /channels/:id - get a specific channel by ID
@channels_bp.route('/<int:id>', methods=['GET'])
def get_channel(id):
    # get the channel from the database by ID
    channel = Channel.query.get(id)
    # if the channel doesn't exist, return an error message
    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    # otherwise, return the channel as JSON
    return jsonify(channel.to_dict()), 200

# route to update a specific channel by ID
# PUT /channels/:id - update a specific channel by ID
@channels_bp.route('/<int:id>', methods=['PUT'])
def update_channel(id):
    # get the channel from the database by ID
    channel = Channel.query.get(id)
    # if the channel doesn't exist, return an error message
    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    server_id = data.get('server_id')

    # update the channel object with the new data
    channel.name = name or channel.name
    channel.description = description or channel.description
    channel.server_id = server_id or channel.server_id

    # save the changes to the database
    db.session.commit()

    # return the updated channel as JSON
    return jsonify(channel.to_dict()), 200

# route to delete a specific channel by ID
# DELETE /channels/:id - delete a specific channel by ID
@channels_bp.route('/<int:id>', methods=['DELETE'])
def delete_channel(id):
    # get the channel from the database by ID
    channel = Channel.query.get(id)
    # if the channel doesn't exist, return an error message
    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    # delete the channel from the database
    db.session.delete(channel)
    db.session.commit()

    # return a message indicating that the channel was deleted
    return jsonify({'message': 'Channel deleted'}), 200

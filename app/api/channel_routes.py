from flask import Blueprint, request, jsonify
from app.models import db, Channel
from app.forms import ChannelForm
from datetime import datetime


channel_routes = Blueprint('channels', __name__)


# route to get all channels
# GET /channels - get all channels
@channels_routes.route('/', methods=['GET'])
def get_all_channels():
    # get all channels from the database
    channels = Channel.query.all()
    # convert each channel to a dictionary and return as JSON
    return jsonify([channel.to_dict() for channel in channels]), 200

# route to create a new channel
# POST /channels - create a new channel
@channels_routes.route('/', methods=['POST'])
def create_channel():
    # create a ChannelForm instance and validate the data
    form = ChannelForm(request.form)
    if form.validate_on_submit():
        # create a new channel object
        channel = Channel(name=form.name.data, description=form.description.data, server_id=form.server_id.data)
        # add the channel to the database
        db.session.add(channel)
        db.session.commit()

        # return the new channel as JSON
        return jsonify(channel.to_dict()), 201
    else:
        # return validation errors as JSON
        return jsonify(form.errors), 400

# route to get a channel's messages
# GET /channels/:channelId/messages
@channels_routes.route('/<int:id>/messages', methods=['GET'])
def get_channel_messages(id):
    # get the channel from the database by ID
    channel = Channel.query.get(id)
    # if the channel doesn't exist, return an error message
    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    # get all messages for the channel
    messages = channel.messages

    # return the messages as JSON
    return jsonify([message.to_dict() for message in messages]), 200


# route to get a specific channel by ID
# GET /channels/:id - get a specific channel by ID
@channels_routes.route('/<int:id>', methods=['GET'])
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
@channels_routes.route('/<int:id>', methods=['PUT'])
def update_channel(id):
    # get the channel from the database by ID
    channel = Channel.query.get(id)
    # if the channel doesn't exist, return an error message
    if channel is None:
        return jsonify({'error': 'Channel not found'}), 404

    # create a channel form and populate it with the request data
    form = ChannelForm(request.form)

    # validate the form
    if form.validate():
        # update the channel object with the new data
        channel.name = form.name.data or channel.name
        channel.description = form.description.data or channel.description
        channel.server_id = form.server_id.data or channel.server_id

        # save the changes to the database
        db.session.commit()

        # return the updated channel as JSON
        return jsonify(channel.to_dict()), 200
    else:
        # return the validation errors as JSON
        return jsonify(form.errors), 400


# route to delete a specific channel by ID
# DELETE /channels/:id - delete a specific channel by ID
@channels_routes.route('/<int:id>', methods=['DELETE'])
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

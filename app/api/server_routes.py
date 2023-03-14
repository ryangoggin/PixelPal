from flask import Blueprint, jsonify, request, session
from flask_login import login_required
# from models.server import db, Server
# breakpoint()
from app.models import db, Server, User

server_routes = Blueprint('servers', __name__)

# route to get all servers
# GET /servers - get all servers
@server_routes.route('', methods=["GET"])
@login_required
def get_all_servers():
    ''' query for all servers and return them in a list of dictionaries'''
    # get all servers from the database
    servers = Server.query.all()
     # convert each server to a dictionary and return as JSON
    return jsonify([server.to_dict() for server in servers]), 200

# route to create a new server
# POST /servers - create a new server
@server_routes.route('', methods=["POST"])
@login_required
def create_server():
    ''' create a new server and return it as a dictionary if successful'''
     # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    owner_id = data.get('owner_id')
    server_picture = data.get('server_picture')

    # create a new server object
    server = Server(name=name, description=description, owner_id=owner_id, server_picture=server_picture)
    # add the server to the database
    db.session.add(server)
    db.session.commit()

    # return the new server as JSON
    return jsonify(server.to_dict()), 201

# route to add a user to a server
# POST /servers/:id/members - add a user to a server
@server_routes.route('/<int:id>/members', methods=['POST'])
@login_required
def add_member_to_server(id):
    ''' add a user to the members of a channel and return the server as a dictionary if successful'''
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # get the username from the request body
    data = request.get_json()
    username = data.get('username')
    if username is None:
        return jsonify({'error': 'User ID not provided'}), 400

    # get the user from the database by username
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # add the user to the server members list
    server.members.append(user)
    db.session.commit()

    # return the server with the updated members list as JSON
    return jsonify(server.to_dict()), 200


# route to get a specific server by ID
# GET /servers/:id - get a specific server by ID
@server_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_server(id):
    ''' query for a server by id and return it as a dictionary if it exists'''
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # otherwise, return the server as JSON
    return jsonify(server.to_dict()), 200

# route to update a specific server by ID
# PUT /servers/:id - update a specific server by ID
@server_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_server(id):
    ''' update a server by id and return it as a dictionary if that server exists'''
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # get the data from the request body
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    owner_id = data.get('owner_id')
    server_picture = data.get('server_picture')

    # update the server object with the new data
    server.name = name or server.name
    server.description = description or server.description
    server.owner_id = owner_id or server.owner_id
    server.server_picture = server_picture or server.server_picture

    # save the changes to the database
    db.session.commit()

    # return the updated server as JSON
    return jsonify(server.to_dict()), 200

# route to delete a specific server by ID
# DELETE /servers/:id - delete a specific server by ID
@server_routes.route('<int:id>', methods=["DELETE"])
@login_required
def delete_server(id):
    ''' delete a server by id and return a message upon successful deletion'''
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # delete the server from the database
    db.session.delete(server)
    db.session.commit()

    # return a message indicating that the server was deleted
    return jsonify({'message': 'Server deleted'}), 200



# route to get all channels for a specific server
# GET /servers/:id/channels - get all channels for a specific server
@server_routes.route('/<int:id>/channels', methods=['GET'])
@login_required
def get_all_channels_for_server(id):
    ''' query for channels by the id of its associated server and return them in a list of dictionaries if they exist'''
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # get all channels for the server
    channels = server.channels

    # convert each channel to a dictionary and return as JSON
    return jsonify([channel.to_dict() for channel in channels]), 200

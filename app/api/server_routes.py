from flask import Blueprint, jsonify, request, session
from flask_login import login_required
# from models.server import db, Server
# breakpoint()
from app.models.server import db, Server

server_routes = Blueprint('servers', __name__)

# route to get all servers
# GET /servers - get all servers
@server_routes.route('', methods=["GET"])
def get_all_servers():
    # get all servers from the database
    servers = Server.query.all()
     # convert each server to a dictionary and return as JSON
    return jsonify([server.to_dict() for server in servers]), 200

# route to create a new server
# POST /servers - create a new server
@server_routes.route('', methods=["POST"])
def create_server():
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

# route to get a specific server by ID
# GET /servers/:id - get a specific server by ID
@server_routes.route('/<int:id>', methods=['GET'])
def get_server(id):
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
def update_server(id):
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
def delete_server(id):
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
def get_all_channels_for_server(id):
    # get the server from the database by ID
    server = Server.query.get(id)
    # if the server doesn't exist, return an error message
    if server is None:
        return jsonify({'error': 'Server not found'}), 404

    # get all channels for the server
    channels = server.channels

    # convert each channel to a dictionary and return as JSON
    return jsonify([channel.to_dict() for channel in channels]), 200

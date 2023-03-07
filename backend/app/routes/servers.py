from flask import Blueprint, request, jsonify
from app.models import Server, db

servers_bp = Blueprint('servers_bp', __name__)

@servers_bp.route('/servers', methods=['POST'])
def create_server():
    data = request.json
    name = data.get('name')
    description = data.get('description')
    owner_id = data.get('owner_id')

    if not name or not description or not owner_id:
        return jsonify({'error': 'Missing required fields'}), 400

    server = Server(name=name, description=description, owner_id=owner_id)
    db.session.add(server)
    db.session.commit()

    return jsonify({'message': 'Server created successfully', 'server': server.to_dict()}), 201

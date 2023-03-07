from flask import Blueprint, request, jsonify

users_bp = Blueprint('users', __name__)



@users_bp.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    # TODO: validate inputs and create new user in database

    return jsonify({'message': 'User created successfully'})

from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from random import random
import string



user_routes = Blueprint('users', __name__)

#GET all /users
@user_routes.route('')
@login_required
def users():
    ''' Query for all users and returns them in a list of user dictionaries '''
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


#GET user by ID users/:id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    ''' Query for a user by id and returns that user in a dictionary '''
    user = User.query.get(id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return user.to_dict_dm()


# POST /users - create a new user
@user_routes.route('', methods=['POST'])
def create_user():
    ''' Create a new user if username + tag doesn't already exist '''
    data = request.get_json()

    # generate a unique 4-digit tag for the username
    tag = ''.join(random.choices(string.digits, k=4))
    username = data['username'] + '#' + tag

    # check if the username already exists
    while User.query.filter_by(username=username).first() is not None:
        tag = ''.join(random.choices(string.digits, k=4))
        username = data['username'] + '#' + tag


    user = User(username=username, email=data['email'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict())


#PUT /users/:id - update user by userID
@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def update_user(user_id):
    ''' Update a user's info if found in the database '''
    data = request.get_json()

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404


    user['username'] = data.get('username', user.username)
    user['email'] = data.get('email', user.email)
    user['password'] = data.get('password', user.password)
    db.session.commit()

    return jsonify(user.to_dict())

# DELETE /users/:id - delete a specific user by ID
@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    ''' Delete a user if found in the database'''
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return '', 200

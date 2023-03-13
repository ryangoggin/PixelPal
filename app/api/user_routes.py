from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# define a route for getting all users
# GET /users - get all users
@user_routes.route('', methods=['GET'])
def get_all_users():
    # query the database for all users
    users = User.query.all()
    # return a JSON response containing all users as dictionaries
    return jsonify([user.to_dict() for user in users])

# define a route for creating a new user
# POST /users - create a new user
@user_routes.route('', methods=['POST'])
def create_user():
    # get the JSON data from the request body
    data = request.get_json()
    # generate a unique 4-digit tag for the username
    tag = ''.join(random.choices(string.digits, k=4))
    username = data['username'] + '#' + tag
    # check if the username already exists
    while User.query.filter_by(username=username).first() is not None:
        tag = ''.join(random.choices(string.digits, k=4))
        username = data['username'] + '#' + tag
    # create a new User object based on the JSON data
    user = User(username=username, email=data['email'], password=data['password'])
    # add the new user to the database session
    db.session.add(user)
    # commit the changes to the database
    db.session.commit()
    # return a JSON response containing the created user as a dictionary
    return jsonify(user.to_dict())


# define a route for getting a specific user by ID
# GET /users/:id - get a specific user by ID
@user_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
def get_user(user_id):
    # query the database for a user with the specified ID
    user = User.query.get(user_id)
    # if the user is not found, return a 404 error response
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    # otherwise, return a JSON response containing the user as a dictionary
    return jsonify(user.to_dict())

# define a route for updating a specific user by ID
# PUT /users/:id - update a specific user by ID
@user_routes.route('/<int:user_id>', methods=['PUT'])
# @login_required
def update_user(user_id):
    # get the JSON data from the request body
    data = request.get_json()
    # query the database for a user with the specified ID
    user = User.query.get(user_id)
    # if the user is not found, return a 404 error response
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    # update the user object with the new data
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    # commit the changes to the database
    db.session.commit()
    # return a JSON response containing the updated user as a dictionary
    return jsonify(user.to_dict())

# define a route for deleting a specific user by ID
# DELETE /users/:id - delete a specific user by ID
@user_routes.route('/<int:user_id>', methods=['DELETE'])
# @login_required
def delete_user(user_id):
    # query the database for a user with the specified ID
    user = User.query.get(user_id)
    # if the user is not found, return a 404 error response
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    # delete the user from the database session
    db.session.delete(user)
    # commit the changes to the database
    db.session.commit()
    # return a 200 success status response
    return '', 200

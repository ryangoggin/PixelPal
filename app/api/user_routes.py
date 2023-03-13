from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
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

# define a route for creating a new user
# POST /users - create a new user
@users_routes.route('/', methods=['POST'])
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

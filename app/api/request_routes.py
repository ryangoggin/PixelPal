from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.friend import Friend
from app.models.user import User
from app.models.request import Request
from app.forms import RequestForm

request_routes = Blueprint('requests', __name__)

# GET /requests - get all received requests for a user
@request_routes.route("/received", methods=['GET'])
@login_required
def get_all_received_requests():
    received_requests = Request.query.filter(Request.receiver_id == current_user.id).all()

    return jsonify({'requests': [request.to_dict() for request in received_requests]})


# GET /requests - get all sent requests for a user
@request_routes.route("/sent", methods=['GET'])
@login_required
def get_all_sent_requests():
    sent_requests = Request.query.filter(Request.sender_id == current_user.id).all()

    return jsonify({'requests': [request.to_dict() for request in sent_requests]})


# POST /requests - create a new request
@request_routes.route('', methods=['POST'])
@login_required
def create_request():
    ''' create a new request and return it as a dictionary if successful'''
    # create lists to compare the inputted username against
    all_users = User.query.all()
    all_users_list = [user.to_username() for user in all_users]
    all_friends = Friend.query.filter(Friend.userId == current_user.id).all()
    all_friends_list = [friend.to_username() for friend in all_friends]
    sent_requests = Request.query.filter(Request.sender_id == current_user.id).all()
    sent_requests_list = [request.to_receiver_username() for request in sent_requests]
    received_requests = Request.query.filter(Request.receiver_id == current_user.id).all()
    received_requests_list = [request.to_sender_username() for request in received_requests]

    res = request.get_json()

    form = RequestForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    errors = {}

    # check if entered username is already a friend, has already sent or receive a request, is the current user, and is an existing user
    if res["username"] in all_friends_list:
        errors["username"] = "You are already friends with this user. Try again!"
        return jsonify({"errors": errors}), 400
    if res["username"] in sent_requests_list:
        errors["username"] = "You already sent a friend request to this user. Try again!"
        return jsonify({"errors": errors}), 400
    if res["username"] in received_requests_list:
        errors["username"] = "You already have a friend request from this user. Try again!"
        return jsonify({"errors": errors}), 400
    if res["username"] == current_user.username:
        errors["username"] = "You cannot send a friend request to yourself. Try again!"
        return jsonify({"errors": errors}), 400
    if res["username"] not in all_users_list:
        errors["username"] = "User with this username does not exist. Try again!"
        return jsonify({"errors": errors}), 400

    #a valid user has been entered, query for them to get their user id
    receiver = User.query.filter(User.username == res["username"]).one()

    if form.validate_on_submit():
        new_request = Request(
            sender_id = current_user.id,
            receiver_id =  receiver.id
        )
        db.session.add(new_request)
        db.session.commit()
        return new_request.to_dict()

    return jsonify({"errors": form.errors}), 400


# POST /requests/:id - accept a request
@request_routes.route("/<int:id>", methods=['POST'])
@login_required
def accept_request(id):
    ''' create a new friend from accepting a request and return it as a dictionary if successful'''
    request = Request.query.get(id)

    if request is None:
        return jsonify({"error": "Request not found"}), 404

    # convert to dict to get full user info for sender and receiver
    request_dict = request.to_dict()

    # make friend entries from the request details
    friends = [
        Friend(userId = request_dict["senderId"], friendId = request_dict["receiverId"]),
        Friend(userId = request_dict["receiverId"], friendId = request_dict["senderId"])
    ]

    db.session.add_all(friends)
    db.session.commit()
    return [friend.to_dict() for friend in friends]


# DELETE /requests/:id - delete a request (should be hit whether accept or decline are clicked)
@request_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def decline_request(id):
    request = Request.query.get(id)

    # return 404 error if request doesn't exist
    if request is None:
        return jsonify({"error": "Request not found"}), 404

    # delete request from db
    db.session.delete(request)
    db.session.commit()

    return jsonify({'message': 'Request deleted'})

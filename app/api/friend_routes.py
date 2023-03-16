from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.friend import Friend
# from app.models.requests import Request

friend_routes = Blueprint('friends', __name__)

@friend_routes.route("/<int:id>", methods=['GET'])
@login_required
def get_all_friends(id):
    friends = Friend.query.filter(Friend.userId == id).all()

    return jsonify({'friends': [friend.to_dict() for friend in friends]})


# @friend_routes.route("/requests", methods=["GET"])
# @login_required
# def get_all_requests():
#     friends = Request.query.all()

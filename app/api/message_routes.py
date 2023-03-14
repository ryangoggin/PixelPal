from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Message
from app.forms import MessageForm
from datetime import datetime


message_routes = Blueprint('messages', __name__)


# GET /messages --> get all messages
@message_routes.route("")
# @login_required
def get_messages():
    ''' query for all messages and return them in a list of dictionaries'''
    all_messages = Message.query.all()
    return [message.to_dict() for message in all_messages]


# GET /messages/:id --> get message by id
@message_routes.route("/<int:id>")
# @login_required
def get_message_id(id):
    ''' query for a message by id and return it as a dictionary if that message exists'''
    message = Message.query.get(id)
    if message:
        return message.to_dict()
    return jsonify({"error": "Message not found"}), 404


# POST /messages --> create a message
@message_routes.route("", methods=["POST"])
# @login_required
def create_message():
    ''' create a new message and return it as a dictionary if successful'''
    res = request.get_json()

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    errors = {}

    # !!!!!!!!!! for testing lower content length to 20, return to 2000 before deploying
    if len(res["content"]) > 2000:
            errors["content"] = "Messages must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        new_message = Message(
            content=res["content"],
            user_id=res["userId"],
            channel_id=["channelId"],
            timestamp = datetime.utcnow()
        )

        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return jsonify({"errors": form.errors}), 400


# PUT /messages/:id --> update a message by id
@message_routes.route("/<int:id>", methods=["PUT"])
# @login_required
def update_message(id):
    ''' update a message by id and return it as a dictionary if that message exists'''
    message = Message.query.get(id)
    res = request.get_json()

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    errors = {}

    # !!!!!!!!!! for testing lower content length to 20, return to 2000 before deploying
    if len(res["content"]) > 2000:
            errors["content"] = "Messages must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if message and form.validate_on_submit():
        message.content = res["content"] or message.content
        message.timestamp = datetime.utcnow()

        db.session.commit()
        return message.to_dict()
    return jsonify({"error": "Message not found"}), 404

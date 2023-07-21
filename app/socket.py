from flask_socketio import SocketIO, emit, join_room, leave_room
from .models import db, Message, privateMessage
import os
from flask import jsonify


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://pixel-pal.onrender.com',
        'https://pixel-pal.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


# join a room (channel)
@socketio.on('join_channel')
def on_join(data):
    username = data['username']
    channel_id = data['channel_id']
    room = f"room-channel{channel_id}"

    join_room(room)
    emit("welcome", f"{username}", room=room)
    return 'Joined channel room'  # This will be sent back to the client

# leave room
@socketio.on('leave_channel')
def on_leave_dm(data):
    channel_id = data['channel_id']
    username = data['username']
    room = f"room-channel{channel_id}"

    leave_room(room)
    print(f'User {username} left room {room}')
    return 'Left channel room'  # This will be sent back to the client


# handle chat messages
@socketio.on("channel_chat")
def handle_chat(data):
    if len(data["content"]) > 2000:
        return jsonify({"errors": "Messages must be less than 2000 characters"}), 400

    new_message = Message(
        content=data["content"],
        user_id=data["userId"],
        channel_id = data["channel_id"],
    )
    db.session.add(new_message)
    db.session.commit()
    emit("chat", new_message.to_dict(), broadcast = True)
    return 'Channel msg sent'  # This will be sent back to the client


# join a room (DM Channel)
@socketio.on('join_dm')
def on_join_dm(data):
    username = data['username']
    private_id = data['private_id']
    dm_room = f"room-dm{private_id}"

    join_room(dm_room)
    emit("welcome", f"{username}", room = dm_room)
    return 'Joined DM room'


# leave a dm channel
@socketio.on('leave_dm')
def on_leave_dm(data):

    username = data['username']
    private_id = data['private_id']
    dm_room = f"room-dm{private_id}"

    leave_room(dm_room)
    print(f'User {username} left room {dm_room}')
    return 'Left DM room'  # This will be sent back to the client



# handle DM chats
@socketio.on('dm_chat')
def handle_dm(data):
    if len(data["content"]) > 2000:
        return jsonify({"errors": "Messages must be less than 2000 characters"}), 400

    dm_message = Message(
        content=data["content"],
        user_id=data["userId"],
        private_id = data["private_id"],
    )

    db.session.add(dm_message)
    db.session.commit()

    emit('dm_chat', dm_message.to_dict(), broadcast = True)
    return 'DM message sent'  # This will be sent back to the client

from flask_socketio import SocketIO, emit, join_room, leave_room
import os


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
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['channel_id']
    join_room(room)
    emit("welcome", f"{username}", room=room)


@socketio.on('leave_channel')
def on_leave_dm(data):
    username = data['username']
    room = data['channel_id']
    leave_room(room)
    emit('goodbye', f"{username}", room=room)


# join a room (DM Channel)
@socketio.on('join_dm')
def on_join_dm(data):
    username = data['username']
    dm_room = data['private_id']
    join_room(dm_room)

    emit("welcome", f"{username}", room=dm_room)

# leave a dm channel
@socketio.on('leave_dm')
def on_leave_dm(data):
    username = data['username']
    dm_room = data['private_id']
    leave_room(dm_room)
    emit('goodbye', f"{username}", room=dm_room)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['channelId']
    emit("chat", data, room=room)

@socketio.on('dm_chat')
def handle_dm(data):
    dm_room = data['privateId']
    emit('dm_chat', data, room=dm_room)

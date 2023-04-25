from flask_socketio import SocketIO, emit, join_room, leave_room
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://pixelpal.onrender.com',
        'https://pixelpal.onrender.com'
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

# join a room (DM Channel)
@socketio.on('join_dm')
def on_join_dm(data):
    username = data['username']
    dm_room = data['private_id']
    join_room(dm_room)

    emit("welcome", f"{username}", room=dm_room)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on('dm_chat')
def handle_dm(data):
    emit('dm_chat', data, broadcast=True)

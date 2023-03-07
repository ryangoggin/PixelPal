from flask import Flask, render_template
from app.config import Configuration
from flask_socketio import SocketIO, emit


# create the Flask application
app = Flask(__name__)
app.config.from_object(Configuration)

# initialize socketio
socketio = SocketIO(app)

# Define a class for a Discord client
class DiscordClient:
    def __init__(self, username):
        self.username = username

# Define a list of connected clients
connected_clients = []

# Define a class for a Discord server
class DiscordServer:
    def __init__(self):
        # Initialize an empty list of channels and users
        self.channels = []
        self.users = []

    # Method to create a new channel
    def create_channel(self, name, topic):
        channel = Channel(name, topic)
        self.channels.append(channel)
        return channel

    # Method to get a list of channels
    def get_channels(self):
        return self.channels

    # Method to create a new user
    def create_user(self, name, email, password):
        user = User(name, email, password)
        self.users.append(user)
        return user

    # Method to get a list of users
    def get_users(self):
        return self.users

# Define a class for a channel
class Channel:
    def __init__(self, name, topic):
        self.name = name
        self.topic = topic
        self.messages = []

    # Method to send a message to the channel
    def send_message(self, user, content):
        message = Message(user, content)
        self.messages.append(message)
        return message

    # Method to get a list of messages in the channel
    def get_messages(self):
        return self.messages

# Define a class for a user
class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

# Define a class for a message
class Message:
    def __init__(self, user, content):
        self.user = user
        self.content = content
        self.timestamp = datetime.datetime.now()


# Create a new Discord server
server = DiscordServer()

# Define a route for the home page
@app.route('/')
def index():
    return render_template('index.html')


# Define an event handler for incoming WebSocket connections
@socketio.on('connect')
def handle_connect():
    print('Client connected')


# Define an event handler for incoming messages
@socketio.on('message')
def handle_message(data):
    print('Received message:', data)

    # Handle the message based on its type
    if data['type'] == 'CONNECT':
        # Create a new Discord client and add it to the list of connected clients
        client = DiscordClient(data['username'])
        connected_clients.append(client)
        emit('connected', client.username, broadcast=True)
    elif data['type'] == 'DISCONNECT':
        # Remove the client from the list of connected clients
        client = next((c for c in connected_clients if c.username == data['username']), None)
        if client:
            connected_clients.remove(client)
            emit('disconnected', client.username, broadcast=True)

# Run the SocketIO server
if __name__ == '__main__':
    socketio.run(app)

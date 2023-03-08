from flask import Flask, render_template, redirect
from flask_migrate import Migrate
from app.config import Configuration
from app.models import db
from .socket import socketio
from app.routes.users import users_bp
from app.routes.channels import channels_bp
from app.routes.messages import messages_bp
from app.routes.emojis import emojis_bp
from app.routes.servers import servers_bp
from app.routes.friendlists import friendlists_bp



# create the Flask application
app = Flask(__name__)
app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(channels_bp, url_prefix='/channels')
app.register_blueprint(messages_bp, url_prefix='/messages')
app.register_blueprint(emojis_bp, url_prefix='/emojis')
app.register_blueprint(servers_bp, url_prefix='/servers')
app.register_blueprint(friendlists_bp, url_prefix='/friendlists')
app.config.from_object(Configuration)

# initialize the database
db.init_app(app)

# initialize Flask-Migrate
migrate = Migrate(app, db)

# initialize the app with the socket instance
# you could include this line right after Migrate(app, db)
socketio.init_app(app)





# at the bottom of the file, use this to run the app
if __name__ == '__main__':
    socketio.run(app)

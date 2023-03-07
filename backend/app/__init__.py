from flask import Flask, render_template, redirect
from flask_migrate import Migrate
from app.config import Configuration
from app.models import db
from .socket import socketio
from app.routes.users import users_bp



# create the Flask application
app = Flask(__name__)
app.register_blueprint(users_bp, url_prefix='/users')
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

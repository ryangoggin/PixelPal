from flask import Flask
from app.config import Configuration


# create the Flask application
app = Flask(__name__)
app.config.from_object(Configuration)







# define a route for the root endpoint
@app.route('/')
def index():
    return '<h1>Hello PixelPal</h1>'

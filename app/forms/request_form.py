from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# for backend validation
class RequestForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# for backend validation
class MessageForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])

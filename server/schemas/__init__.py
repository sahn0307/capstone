
#! internal imports
from models.user import User
from models.card import Card
from app_config import ma

#! external libraries imports
from marshmallow import validates, ValidationError, fields, validate

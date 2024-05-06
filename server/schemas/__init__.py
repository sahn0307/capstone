
#! internal imports
from models.user import User
from models.card import Card
from models.user_card import UserCard
from models.transaction import Transaction
from app_config import ma

#! external libraries imports
from marshmallow import validates, ValidationError, fields, validate

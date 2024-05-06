from . import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    buy_price = db.Column(db.Float)
    sell_price = db.Column(db.Float)
    card_name = db.Column(db.String(100), nullable=False)

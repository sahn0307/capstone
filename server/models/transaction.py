from . import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id = db.Column(db.String(100), db.ForeignKey('cards.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    buy_price = db.Column(db.Float, nullable=True)
    sell_price = db.Column(db.Float, nullable=True)
    transaction_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    

   
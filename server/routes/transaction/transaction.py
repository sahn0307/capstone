from .. import (
    request,
    Resource,
    db
)
from models.transaction import Transaction

class Transaction(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        card_id = data.get('card_id')
        quantity = data.get('quantity')
        buy_price = data.get('buy_price')
        sell_price = data.get('sell_price')
        transaction_date = data.get('transaction_date')

        transaction = Transaction(user_id=user_id, card_id=card_id, quantity=quantity, buy_price=buy_price, sell_price=sell_price, transaction_date=transaction_date)
        db.session.add(transaction)
        db.session.commit()
        return {'message': 'Transaction added successfully'}

    def get(self):
        user_id = request.args.get('user_id')
        transactions = Transaction.query.filter_by(user_id=user_id).all()
        transaction_data = [{
            'id': transaction.id,
            'card_id': transaction.card_id,
            'quantity': transaction.quantity,
            'buy_price': transaction.buy_price,
            'sell_price': transaction.sell_price,
            'transaction_date': transaction.transaction_date
        } for transaction in transactions]

        return transaction_data
    

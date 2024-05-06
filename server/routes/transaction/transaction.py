from .. import request, Resource, db
from models.transaction import Transaction
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func, case, literal_column
from flask import jsonify
class TransactionResource(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        card_id = data.get('card_id')
        quantity = data.get('quantity')
        buy_price = data.get('buy_price')
        sell_price = data.get('sell_price')
        card_name = data.get('card_name')

        try:
            transaction = Transaction(
                user_id=user_id,
                card_id=card_id,
                quantity=quantity,
                buy_price=buy_price,
                sell_price=sell_price,
                card_name=card_name
            )
            db.session.add(transaction)
            db.session.commit()
            return {'message': 'Transaction added successfully'}, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            return {'message': str(e)}, 400
        except Exception as e:
            return {'message': str(e)}, 400
    def get(self):
        user_id = request.args.get('user_id')
        if not user_id:
            return {'message': 'User ID is required'}, 400

        transactions = Transaction.query.filter_by(user_id=user_id).all()
        transaction_data = []
        for transaction in transactions:
            transaction_data.append({
                'id': transaction.id,
                'user_id': transaction.user_id,
                'card_id': transaction.card_id,
                'quantity': transaction.quantity,
                'buy_price': transaction.buy_price,
                'sell_price': transaction.sell_price,
                'card_name': transaction.card_name
            })

        return transaction_data, 200
    
class TransactionTotal(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if not user_id:
            return {'message': 'User ID is required'}, 400

        total_buy_price = (
            db.session.query(func.sum(Transaction.buy_price))
            .filter_by(user_id=user_id)
            .filter(Transaction.buy_price.isnot(None))
            .scalar() or 0
        )
        total_sell_price = (
            db.session.query(func.sum(Transaction.sell_price))
            .filter_by(user_id=user_id)
            .filter(Transaction.sell_price.isnot(None))
            .scalar() or 0
        )

        profit_loss = total_sell_price - total_buy_price

        return ({'profitLoss': profit_loss}), 200
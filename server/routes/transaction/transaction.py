from .. import request, Resource, db
from models.transaction import Transaction
from sqlalchemy.exc import SQLAlchemyError

class TransactionResource(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        card_id = data.get('card_id')
        quantity = data.get('quantity')
        buy_price = data.get('buy_price')
        sell_price = data.get('sell_price')

        try:
            transaction = Transaction(
                user_id=user_id,
                card_id=card_id,
                quantity=quantity,
                buy_price=buy_price,
                sell_price=sell_price,
            )
            db.session.add(transaction)
            db.session.commit()
            return {'message': 'Transaction added successfully'}, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            return {'message': str(e)}, 500
        except Exception as e:
            return {'message': str(e)}, 500
from .. import (
    request,
    Resource,
    db,
)
from models.user_card import UserCard
from models.card import Card
from flask import jsonify


class UserCardResource(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        card_id = data.get('card_id')
        quantity = data.get('quantity', 1)
        

        user_card = UserCard.query.filter_by(user_id=user_id, card_id=card_id).first()
        if user_card:
            user_card.quantity += quantity
        else:
            user_card = UserCard(user_id=user_id, card_id=card_id, quantity=quantity)
            db.session.add(user_card)

        db.session.commit()
        return jsonify({'message': 'Card added to user collection'})

    def get(self):
        user_id = request.args.get('user_id')
        search_query = request.args.get('search', '')
        total_cards = UserCard.query.filter_by(user_id=user_id).join(Card).filter(Card.name.ilike(f'%{search_query}%')).count()


        user_cards_query = UserCard.query.filter_by(user_id=user_id)
        if search_query:
            search_pattern = f'%{search_query}%'
            user_cards_query = user_cards_query.join(Card).filter(Card.name.ilike(search_pattern))
            

        user_cards = user_cards_query.all()

        cards = []
        for user_card in user_cards:
            card = Card.query.get(user_card.card_id)
            cards.append({
                'id': user_card.id,
                'card_id': card.id,
                'name': card.name,
                'image_url': card.image_url,
                'price': card.price,
                'quantity': user_card.quantity,
                'total_cards': total_cards
            })

        return jsonify(cards)

class UserCardItemResource(Resource):
    def put(self, user_card_id):
        data = request.get_json()
        quantity = data.get('quantity')

        user_card = UserCard.query.get(user_card_id)
        if user_card:
            user_card.quantity = quantity
            db.session.commit()
            return jsonify({'message': 'User card updated successfully'})
        else:
            return jsonify({'message': 'User card not found'}), 404

    def delete(self, user_card_id):
        user_card = UserCard.query.get(user_card_id)
        if user_card:
            db.session.delete(user_card)
            db.session.commit()
            return jsonify({'message': 'User card deleted successfully'})
        else:
            return jsonify({'message': 'User card not found'}), 404

class UserCardValueResource(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        user_cards = UserCard.query.filter_by(user_id=user_id).all()

        total_value = 0
        for user_card in user_cards:
            card = Card.query.get(user_card.card_id)
            total_value += card.price * user_card.quantity

        return jsonify({'value': total_value})

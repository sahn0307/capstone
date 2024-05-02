from .. import (
    request,
    Resource,
)
from models.card import Card
class CardsAPI(Resource):
    def get(self):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=20, type=int)
        search_query = request.args.get('search', '')
        total_cards = Card.query.filter(Card.name.ilike(f'%{search_query}%')).count()

        cards_query = Card.query
        if search_query:
            search_pattern = f'%{search_query}%'
            cards_query = cards_query.filter(Card.name.ilike(search_pattern))

        cards = cards_query.paginate(page=page, per_page=per_page)


        card_data = [{
            'id': card.id,
            'name': card.name,
            'image_url': card.image_url,
            'price': card.price
        } for card in cards.items]

        return {
            'cards': card_data,
            'total_pages': cards.pages,
            'current_page': cards.page,
            'total_cards': total_cards
        }
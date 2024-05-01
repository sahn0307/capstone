from .. import (
    request,
    Resource,
)
from models.card import Card
class CardsAPI(Resource):
    def get(self):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=20, type=int)
        cards = Card.query.paginate(page=page, per_page=per_page)

        card_data = [{
            'id': card.id,
            'name': card.name,
            'image_url': card.image_url,
            'price': card.price
        } for card in cards.items]

        return {
            'cards': card_data,
            'total_pages': cards.pages,
            'current_page': cards.page
        }
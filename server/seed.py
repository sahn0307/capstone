import json
from app_config import app, db
from models.card import Card

def seed_cards():
    with open('cards_data.json') as file:
        data = json.load(file)

    for card_data in data:
        card = Card(
            id=card_data.get('id', ''),
            name=card_data.get('name', ''),
            image_url=card_data.get('image_uris', {}).get('normal', ''),
            price=card_data.get('prices', {}).get('usd', None),
            set_name=card_data['set_name'],
            colors=','.join(card_data['color_identity'])  # Join color identities as a comma-separated string
        )
        db.session.add(card)

    db.session.commit()
    print("Cards seeded successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_cards()
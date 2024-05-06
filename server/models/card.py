from . import db

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=True)
    set_name = db.Column(db.String(100), nullable=False)
    colors = db.Column(db.String(100), nullable=False)
    
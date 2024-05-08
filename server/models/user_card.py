from . import db

class UserCard(db.Model):
    __tablename__ = 'user_cards'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id = db.Column(db.String(100), db.ForeignKey('cards.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    user = db.relationship('User', backref=db.backref('user_cards', lazy=True, cascade='all, delete-orphan'))
    card = db.relationship('Card', backref=db.backref('user_cards', lazy=True))
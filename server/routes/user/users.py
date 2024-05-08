from .. import (
    request,
    Resource,
    db,
    user_schema,
    create_access_token,
    make_response,
    set_access_cookies,
    create_refresh_token,
    set_refresh_cookies,
    jwt_required
)
from models.user import User

class Users(Resource):
    def post(self):
        try:
            data = request.json
            user = user_schema.load(data)
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(identity=user.id)
            response = make_response(user_schema.dump(user), 201)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422

class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return user_schema.dump(user), 200
    
    @jwt_required()
    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        try:
            data = request.json
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            db.session.commit()
            return user_schema.dump(user), 200
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 422
        
    @jwt_required()
    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200
        



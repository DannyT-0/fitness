from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app import db

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400
    
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, user={"username": user.username, "email": user.email}), 200
    return jsonify({"msg": "Invalid username or password"}), 401

@bp.route('/validate-token', methods=['POST'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(user={"username": user.username, "email": user.email}), 200
    return jsonify({"msg": "User not found"}), 404
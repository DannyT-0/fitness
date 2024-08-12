from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.workout import Workout
from app import db

bp = Blueprint('workouts', __name__)

@bp.route('/workouts', methods=['GET'])
@jwt_required()
def get_workouts():
    user_id = get_jwt_identity()
    workouts = Workout.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': w.id,
        'type': w.type,
        'duration': w.duration,
        'calories_burned': w.calories_burned,
        'date': w.date.isoformat()
    } for w in workouts]), 200

@bp.route('/workouts', methods=['POST'])
@jwt_required()
def create_workout():
    user_id = get_jwt_identity()
    data = request.get_json()
    workout = Workout(user_id=user_id, **data)
    db.session.add(workout)
    db.session.commit()
    return jsonify({
        'id': workout.id,
        'type': workout.type,
        'duration': workout.duration,
        'calories_burned': workout.calories_burned,
        'date': workout.date.isoformat()
    }), 201
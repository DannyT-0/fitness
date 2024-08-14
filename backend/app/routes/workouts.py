from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.workout import Workout
from app import db
from datetime import datetime

bp = Blueprint('workouts', __name__)

@bp.route('/workouts', methods=['GET'])
@jwt_required()
def get_workouts():
    try:
        user_id = get_jwt_identity()
        workouts = Workout.query.filter_by(user_id=user_id).all()
        return jsonify([{
            'id': w.id,
            'type': w.type,
            'sets': w.sets,
            'reps': w.reps,
            'weight': w.weight,
            'date': w.date.isoformat(),
            'bodyPart': w.bodyPart
        } for w in workouts]), 200
    except Exception as e:
        print(f"Error in get_workouts: {str(e)}")
        return jsonify({"msg": "Error fetching workouts"}), 500

@bp.route('/workouts', methods=['POST'])
@jwt_required()
def create_workout():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        print(f"Received workout data: {data}")

        workout = Workout(
            user_id=user_id,
            type=data['type'],
            sets=data['sets'],
            reps=data['reps'],
            weight=data['weight'],
            date=datetime.fromisoformat(data['date'].replace('Z', '+00:00')),
            bodyPart=data['bodyPart']
        )

        db.session.add(workout)
        db.session.commit()

        print(f"Workout created with ID: {workout.id}")

        return jsonify({
            'id': workout.id,
            'type': workout.type,
            'sets': workout.sets,
            'reps': workout.reps,
            'weight': workout.weight,
            'date': workout.date.isoformat(),
            'bodyPart': workout.bodyPart
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error in create_workout: {str(e)}")
        return jsonify({"msg": "Error creating workout"}), 500

@bp.route('/workouts/<int:workout_id>', methods=['PUT'])
@jwt_required()
def update_workout(workout_id):
    try:
        user_id = get_jwt_identity()
        workout = Workout.query.filter_by(id=workout_id, user_id=user_id).first()
        if not workout:
            return jsonify({"msg": "Workout not found"}), 404

        data = request.get_json()
        workout.type = data.get('type', workout.type)
        workout.sets = data.get('sets', workout.sets)
        workout.reps = data.get('reps', workout.reps)
        workout.weight = data.get('weight', workout.weight)
        workout.date = datetime.fromisoformat(data.get('date', workout.date.isoformat()).replace('Z', '+00:00'))
        workout.bodyPart = data.get('bodyPart', workout.bodyPart)

        db.session.commit()
        return jsonify({
            'id': workout.id,
            'type': workout.type,
            'sets': workout.sets,
            'reps': workout.reps,
            'weight': workout.weight,
            'date': workout.date.isoformat(),
            'bodyPart': workout.bodyPart
        }), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error in update_workout: {str(e)}")
        return jsonify({"msg": "Error updating workout"}), 500

@bp.route('/workouts/<int:workout_id>', methods=['DELETE'])
@jwt_required()
def delete_workout(workout_id):
    try:
        user_id = get_jwt_identity()
        workout = Workout.query.filter_by(id=workout_id, user_id=user_id).first()
        if not workout:
            return jsonify({"msg": "Workout not found"}), 404

        db.session.delete(workout)
        db.session.commit()
        return jsonify({"msg": "Workout deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error in delete_workout: {str(e)}")
        return jsonify({"msg": "Error deleting workout"}), 500
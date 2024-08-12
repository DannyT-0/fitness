from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.chat_usage import ChatbotUsage
from app.services.chatbot_service import get_chatbot_response
from app import db
from datetime import datetime, timedelta

bp = Blueprint('chatbot', __name__)

@bp.route('/chatbot', methods=['POST'])
@jwt_required()
def chatbot():
    user_id = get_jwt_identity()
    usage = ChatbotUsage.query.filter_by(user_id=user_id).first()
    
    if not usage:
        usage = ChatbotUsage(user_id=user_id)
        db.session.add(usage)
    
    if usage.usage_count >= 5 and (datetime.utcnow() - usage.last_used) < timedelta(days=1):
        return jsonify({"msg": "Daily limit reached"}), 429
    
    data = request.get_json()
    response = get_chatbot_response(data['message'])
    
    usage.usage_count += 1
    usage.last_used = datetime.utcnow()
    db.session.commit()
    
    return jsonify({"response": response}), 200
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config 

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes import auth, workouts, chatbot
    app.register_blueprint(auth.bp)
    app.register_blueprint(workouts.bp)
    app.register_blueprint(chatbot.bp)

    return app
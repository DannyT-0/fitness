import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config 
from dotenv import load_dotenv

load_dotenv()  # This loads the variables from .env

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, origins=["http://localhost:5173"], 
         methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"], 
         allow_headers=["Authorization", "Content-Type"],
         supports_credentials=True)

    from .routes import auth, workouts
    app.register_blueprint(auth.bp)
    app.register_blueprint(workouts.bp)

    return app
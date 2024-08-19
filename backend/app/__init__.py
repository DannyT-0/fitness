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

    # Update CORS configuration to be more flexible
    CORS(app, origins=os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(','), 
         methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"], 
         allow_headers=["Authorization", "Content-Type"],
         supports_credentials=True)
    
    @app.route('/health', methods=['GET'])
    def health_check():
     return "Healthy", 200

    
    

    from .routes import auth, workouts
    app.register_blueprint(auth.bp)
    app.register_blueprint(workouts.bp)

    return app

# This block is not necessary when using Gunicorn, but can be helpful for local development. Going to leave this in just in case.
if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
from app import db
from datetime import datetime

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    type = db.Column(db.String(64), nullable=False)
    sets= db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default = datetime.utcnow)
    bodyPart = db.Column(db.String(100), nullable=False)

    user = db.relationship("User", backref=db.backref("workouts", lazy=True))
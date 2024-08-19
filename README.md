# Workout Tracker App

This is a full-stack application for tracking workouts, built with a React/TypeScript frontend and a Python Flask backend, using a PostgreSQL database.

## Features

- User registration and authentication
- Create, read, update, and delete workouts
- Track workout details including type, sets, reps, weight, date, and body part
- Responsive design for both desktop and mobile use

## Tech Stack

### Frontend

- React
- TypeScript
- Redux for state management
- Styled-components for styling
- Axios for API calls

### Backend

- Python
- Flask
- Flask-JWT-Extended for authentication
- Flask-SQLAlchemy for database ORM
- Flask-Migrate for database migrations
- PostgreSQL as the database

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- Python (v3.7 or later)
- pip
- PostgreSQL

## Installation and Setup

### Backend Setup

1. Clone the repository: `git clone https://github.com/DannyT-0/fitness.git` `cd fitness/backend`

2. Create a virtual environment and activate it: `python -m venv venv` `source venv/bin/activate  # On Windows use venv\Scripts\activate`

3. Install the required Python packages: `pip install -r requirements.txt`

4. Set up your PostgreSQL database and update the `config.py` file with your database URI.

5. Set up your environment variables: Create a `.env` file in the backend directory with the following content:
   `FLASK_APP=run.py`
   `FLASK_ENV=development`
   `DATABASE_URL=postgresql://username:password@localhost/dbname`
   `JWT_SECRET_KEY=your_jwt_secret_key`

6. Initialize the database: `flask db init` `flask db migrate` `flask db upgrade`

7. Run the Flask development server: `flask run` The backend should now be running on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory: `cd ../frontend`

2. Install the required npm packages: `npm install`

3. Create a `.env` file in the frontend directory with the following content: `REACT_APP_API_URL=http://localhost:5000`

4. Start the React development server: `npm run dev` The frontend should now be running on `http://localhost:5173`.

## Usage

1. Open your web browser and go to `http://localhost:5173`
2. Register for a new account or log in if you already have one
3. Use the interface to add, view, edit, or delete your workouts

## API Endpoints

- `POST /register`: Register a new user
- `POST /login`: Authenticate a user and receive a JWT
- `POST /validate-token`: Validate a JWT and get user information
- `GET /workouts`: Get all workouts for the authenticated user
- `POST /workouts`: Create a new workout
- `PUT /workouts/<id>`: Update a specific workout
- `DELETE /workouts/<id>`: Delete a specific workout

## Contributing

Contributions to the Workout Tracker App are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Danny T - dannytokarev@gmail.com

Project Link: https://github.com/DannyT-0/fitness

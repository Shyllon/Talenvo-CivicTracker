# Civic Tracker API

## Summary
Civic Tracker API is a RESTful service that allows users to register, login, and manage events, RSVPs, and notifications for a civic engagement platform. The API provides endpoints for user management, event handling, and more.

## Features
- User Registration & Login (JWT Authentication)
- Event Management (CRUD operations for events)
- Politicians Management
- Project Management
- RSVP Management
- Notification Management

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) for authentication

## Prerequisites
Before running the project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or above)
- [MongoDB](https://www.mongodb.com/) (if running locally, otherwise use a cloud-based service like MongoDB Atlas)

## Setup and Running the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shyllon/Talenvo-CivicTracker.git
   cd your-repo-name

Install dependencies:

Run the following command to install the required packages:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of the project and add the following environment variables (modify them based on your setup):

env
Copy code
MONGO_URI=mongodb://localhost:27017/CivicTrackerDB
JWT_SECRET=your-secret-key
PORT=5000

Start the application:

Run the following command to start the application:

bash

npm start
The API should now be running on http://localhost:5000.

## API Endpoints
1. POST /users
Description: Registers a new user.

Request Body:

json
Copy code
{
  "name": "Kola Obadina",
  "email": "kolaoba@example.com",
  "password": "kolaoba123"
}
Response:

json
Copy code
{
  "message": "User created successfully",
  "user": { ... }
}
2. POST /auth/login
Description: Logs in a user and returns a JWT token.

Request Body:

json
Copy code
{
  "email": "kolaoba@example.com",
  "password": "kolaoba123"
}
Response:

json
Copy code
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
Testing the API
You can use tools like Postman or Curl to test the API endpoints. Here's an example of using Curl:

Login:
bash
Copy code
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email": kolaoba@example.com", "password": "kolaoba123"}'

## License
This project is licensed under the MIT License - see the LICENSE file for details.

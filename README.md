## PicShare Web App
Overview
PicShare is a simple photo-sharing web app that allows users to share pictures by URL, mark their favorite pictures, and view details. The app is divided into a backend API (NestJS  with MySQL) and a frontend (React.js with Typescript). Below are the steps to set up both components.

## Backend Setup
Prerequisites
Install Node.js (preferably version 14.x or higher).
Install MySQL (MySQL Workbench or command-line version).
Backend Installation
Navigate to the backend project folder.

cd my-picshare-app

Install dependencies:

npm install 3. Create the MySQL database and tables using the SQL commands below.

Update database connection details in server.js:

const db = mysql.createConnection({ host: 'localhost', user: 'root', // Your MySQL username password: 'priyanka', // Your MySQL password database: 'picshare' // Database name });
MySQL Database Setup
Run the following SQL commands to create the required tables: Login to MySQL Dataase-- mysql -u root -p Enter password: ******** //Enter your MySQL password

-- Create the 'picshare' database CREATE DATABASE IF NOT EXISTS picshare;

USE picshare;

-- Create 'users' table CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE );

-- Create 'pictures' table CREATE TABLE IF NOT EXISTS pictures ( id INT AUTO_INCREMENT PRIMARY KEY, url TEXT NOT NULL, title VARCHAR(255) NOT NULL, user_id INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) );

-- Create 'favorites' table CREATE TABLE IF NOT EXISTS favorites ( id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, picture_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (picture_id) REFERENCES pictures(id), UNIQUE(user_id, picture_id) );

Running the Backend Start the server: npm run start
The backend will run on http://localhost:5000.

## Frontend Setup
Prerequisites

Install Node.js (preferably version 14.x or higher). Frontend Installation
Navigate to the frontend project folder.
cd picshare-frontend

Install dependencies:
npm install

Run the frontend:
npm start

The frontend will run on http://localhost:3000.

## Frontend and Backend Interaction
The frontend communicates with the backend through the following API endpoints:

Authentication (Users)
POST /api/users/login:
Accepts a username in the request body and returns the user ID.
Pictures
GET /api/pictures/all: Fetches all pictures uploaded by all users.
GET /api/pictures?userId=<user_id>: Fetches pictures uploaded by a specific user.
POST /api/pictures: Allows a user to upload a picture (URL + title).
Favorites
GET /api/favorites/:userId: Fetches pictures marked as favorites by a specific user.
POST /api/favorites: Allows a user to add a picture to their favorites.
DELETE /api/favorites: Allows a user to remove a picture from their favorites.

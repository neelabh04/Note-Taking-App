# Note-Taking App
Welcome to the Note-Taking App! This application allows users to create, manage, and store notes securely. Below is a comprehensive guide on how to set up and run the project.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features
- User authentication (signup, login)
- Secure note storage
- CRUD operations for notes

## Technologies Used
### Backend
- Express
- bcrypt
- cookie-parser
- dotenv
- jsonwebtoken
- mysql2
- sequelize

## Prerequisites
- Node.js and npm installed
- MySQL installed and running

## Installation
1. **Clone the repository**: 
   ```bash
   git clone https://github.com/neelabh04/Note-Taking-App.git
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root of the project and paste the following:
   ```env
    // JWT authentication
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=your_access_token_expiry
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

    // MySQL Database Configuration
    DATABASE_NAME=your_database_name
    DATABASE_USERNAME=your_database_username
    DATABASE_PASSWORD=your_database_password
    DATABASE_URI=your_database_uri
    DATABASE_PORT=your_database_port

    // CORS
    CORS_ORIGIN=*

    // Server Port
    PORT=your_server_port
   ```

3. **Set up the database**:
   ```bash
   npx sequelize db:create
   npx sequelize db:migrate
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage
To start the application, run:
```bash
npm start
```

## API Endpoints
- The following endpoints are present for the application. 
- Choose the `Note-Taking.postman_collection.json` collection file present in the root of the project. And import it in the postman for ease of testing

### User Endpoints
#### Create a User
- **Description**: Creates a user.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/signup`
- **Body Parameters**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

#### Login User
- **Description**: Logins the user.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/login`
- **Body Parameters**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Note Endpoints
#### Create a Note
- **Description**: Creates a new note.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/notes`
- **Body Parameters**:
  ```json
  {
    "title": "your_note_title",
    "content": "your_note_content"
  }
  ```

#### Fetch All Notes
- **Description**: Shows all the notes present for the user.
- **Request Type**: `GET`
- **Endpoint**: `/api/v1/notes`

#### Update a Note
- **Description**: Updates a given note.
- **Request Type**: `PUT`
- **Endpoint**: `/api/v1/notes/:id`
- **Body Parameters**:
  ```json
  {
    "title": "updated_note_title",
    "content": "updated_note_content"
  }
  ```

#### Delete a Note
- **Description**: Deletes a given note.
- **Request Type**: `DELETE`
- **Endpoint**: `/api/v1/notes/:id`

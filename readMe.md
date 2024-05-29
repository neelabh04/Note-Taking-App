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

### Frontend

- React
- Redux
- Redux-Toolkit
- Axios
- React-Router

### Backend

- Express
- bcrypt
- cookie-parser
- dotenv
- jsonwebtoken
- mysql2
- Sequelize

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

3. **Set up the database**: Create the database in your local machine using MySQL. Provide the necessary details as mentioned in the `.env` file above.

4. **Install dependencies**: Go to the root of the folder and install the necessary dependenices by going individually in Frontend and Backend of the project. Run the below commands. 
   ```bash
   cd Frontend
   npm install

   cd Backend
   npm install
   ```

## Usage

To start the application, run:

```bash
npm start
```

## API Endpoints

- The following endpoints are present for the application.

**Pro-Tip**: If you have postman installed in your local machine, you can just import the API collection present in the root of the project and start accessing the APIs.

### User Endpoints

The base url API endpoint is `http://localhost:<your-server-port>`, in order to hit your desired enpoint append the base url with the api as per the documentation.

#### Create a User

- **Description**: Creates a user.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/signup`

##### Request

Payload:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": {
    "email": "yourName@gmail.com"
  },
  "message": "User registered Successfully",
  "success": true
}
```

Error:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>
  <body>
    <pre>Error: User already exists<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/controllers/user.controller.js:55:11<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</pre>
  </body>
</html>
```

#### Login User

- **Description**: Logins the user.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/login`

##### Request

Payload:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "email": "yourName@gmail.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5b3VyTmFtZUBnbWFpbC5jb20iLCJpYXQiOjE3MTY4ODA0ODcsImV4cCI6MTcxNjk2Njg4N30.frt9BjU7FXT8yWgkwVG91SO4U5K83CPLghHB9BGMa80"
  },
  "message": "User logged In Successfully",
  "success": true
}
```

Error:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Error: Invalid user credentials.<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/controllers/user.controller.js:97:11</pre>
  </body>
</html>
```

### Note Endpoints

#### Create a Note

- **Description**: Creates a new note.
- **Request Type**: `POST`
- **Endpoint**: `/api/v1/notes`

##### Request

Payload:

```json
{
  "title": "your_note_title",
  "content": "your_note_content"
}
```

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": {
    "title": "note 1",
    "content": "testing 123",
    "created_at": "2024-05-28T07:17:08.000Z",
    "updated_at": "2024-05-28T07:17:08.000Z"
  },
  "message": "Note created successfully",
  "success": true
}
```

Error:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Error: Title is required<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/controllers/note.controller.js:14:11<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/utils/asyncHandler.js:3:25<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (D:\Projects\Note-Taking-App\Backend\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at next (D:\Projects\Note-Taking-App\Backend\node_modules\express\lib\router\route.js:149:13)<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/middlewares/auth.middleware.js:21:9<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</pre>
  </body>
</html>
```

#### Fetch All Notes

- **Description**: Shows all the notes present for the user.
- **Request Type**: `GET`
- **Endpoint**: `/api/v1/notes`

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "note 1",
      "content": "testing 123",
      "created_at": "2024-05-28T07:17:08.000Z",
      "updated_at": "2024-05-28T07:17:08.000Z"
    },
    {
      "id": 2,
      "title": "note 2",
      "content": "testing 1234",
      "created_at": "2024-05-28T07:17:29.000Z",
      "updated_at": "2024-05-28T07:17:29.000Z"
    }
  ],
  "message": "Notes showing successfully",
  "success": true
}
```

#### Update a Note

- **Description**: Updates a given note.
- **Request Type**: `PUT`
- **Endpoint**: `/api/v1/notes/:id`

##### Request

Payload:

```json
{
  "title": "updated_note_title",
  "content": "updated_note_content"
}
```

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": [1],
  "message": "Notes updated successfully",
  "success": true
}
```

Error:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Error: Title is required<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/controllers/note.controller.js:71:11<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/utils/asyncHandler.js:3:25<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (D:\Projects\Note-Taking-App\Backend\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at next (D:\Projects\Note-Taking-App\Backend\node_modules\express\lib\router\route.js:149:13)<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/middlewares/auth.middleware.js:21:9<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</pre>
  </body>
</html>
```

#### Delete a Note

- **Description**: Deletes a given note.
- **Request Type**: `DELETE`
- **Endpoint**: `/api/v1/notes/:id`

##### Response

Success:

```json
{
  "statusCode": 200,
  "data": 1,
  "message": "Note deleted successfully",
  "success": true
}
```

Error:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Error</title>
  </head>

  <body>
    <pre>Error: Note does not exist.<br> &nbsp; &nbsp;at file:///D:/Projects/Note-Taking-App/Backend/src/controllers/note.controller.js:102:11<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</pre>
  </body>
</html>
```

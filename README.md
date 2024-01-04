# Compass Challenge 3 API

## Overview

This repository contains the source code for the Compass Challenge 3 API, a RESTful API built using Express and MongoDB. The API provides endpoints for managing events and user authentication.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Routes](#routes)
- [Authentication](#authentication)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

  
## Technologies Used

- Node.js v20.10.5
- MongoDB v8.0.3
- TypeScript
- Express v4.18.2
- JSON Web Token (JWT) v9.0.2
- Joi v17.11.0
- Eslint v8.56.0
- Prettier v3.1.1

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/compass-challenge3.git

2. **Install dependencies:**

   ```bash
   cd compass-challenge3
   npm install

3. **Set up environment variables:**

   Create a .env file in the root directory and add the following:

   env
   MONGO_URL=your-mongodb-connection-string
   SECRET=your-secret-key
   PORT=your-preferred-port

   Replace your-mongodb-connection-string with your MongoDB connection string and set a secure SECRET for JWT token generation.

4. **Run the application:**

   ```bash
   npm start
   ```
   The API will be accessible at http://localhost:your-preferred-port/api/v1.

## Project Structure

The project follows the following structure:

- src/controllers: Contains controllers handling HTTP requests.
- src/errors: Custom error classes.
- src/interfaces: TypeScript interfaces.
- src/middlewares: Custom middleware functions.
- src/model: MongoDB Mongoose models.
- src/repositories: Data access layer.
- src/routes: Express route definitions.
- src/services: Business logic layer.
- src/validation: Input validation using Joi.

## Usage

The API provides endpoints for creating, retrieving, and deleting events. User authentication endpoints for signing up and signing in are also available.

## Routes

- **POST /api/v1/users/sign-up:** Sign up a new user.

  Example Payload:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "birthDate": "string (YYYY-MM-DD)",
    "city": "string",
    "country": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }```
  
- **POST /api/v1/users/sign-in: Sign in an existing user.
  Example Payload:
  ```json
  {
  "email": "string",
  "password": "string"
}```

- **POST /api/v1/events: Create a new event.
  Example Payload:
  ```json
  {
  "description": "string",
  "dayOfWeek": "string"
  }
  
- GET /api/v1/events: Get all events for a specific day.
- DELETE /api/v1/events: Delete all events for a specific day.
- GET /api/v1/events/:id: Get a specific event by ID.
- DELETE /api/v1/events/:id: Delete a specific event by ID.

## Authentication

The API uses JWT for user authentication. Include the JWT token in the Authorization header for protected routes.

## Testing

Run tests using:

```bash
npm test

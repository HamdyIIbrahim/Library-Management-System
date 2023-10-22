# Library Management System

Design and implement a simple library management system to manage books and borrowers.

## Prerequisites

List the prerequisites and dependencies needed to run your application. In your case, they include:

- Node.js
- PostgreSQL
- Sequelize
- db-migrate
- Other dependencies from your `package.json` file

## Installation

1. **Clone the Repository:**
   Clone your project's Git repository to your local machine using the following command:

   ```shell
   git clone <repository_url>

   ```

2. **Install Dependencies:**
   Navigate to your project's root directory and install the required dependencies using npm:

   ```shell
   npm install

   ```

3. **Set Environment Variables:**
   Create an .env file in your project's root directory and set the environment variables required for your application. You've provided an example .env file in your question. Make sure to replace the values with the actual credentials and configuration specific to your PostgreSQL database.

   DB_USER= usename
   DB_PASS= password
   DB_NAME= username
   DB_HOST= the host be the value between @ and / in connection string
   DB_CONNECTION= postgres connection

## Database Setup

1. **Database Migration:**
   Run the database migration to set up your PostgreSQL database schema:

   ```shell
   npm run db-migrate-up

   This command will execute the migrations defined in your db-migrate configuration
   ```

## Running the Application

1. **Running the Application:**
   To start your Express.js application, use the following command:

   ```shell
   npm start
   Your application will be accessible at the defined port (usually 3000 or another port you specify).

   ```

2. **Development:**
   If you want to run the application in development mode with automatic server restart, use the following command:

   ```shell
   npm run dev
   Your application will be accessible at the defined port (usually 3000 or another port you specify) with nodemon.

   ```

3. **Running Tests:**
   You can run tests for your application using the following command:

   ```shell
   npm test
   ```

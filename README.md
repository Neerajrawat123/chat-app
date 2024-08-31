# Chat App
This is a full-stack chat application built with Node.js and Drizzle ORM on the backend and React on the frontend. The application supports real-time messaging, message status tracking (seen/unseen), and user authentication.

![image of chat app](https://drive.google.com/file/d/1BYLV3hEPWIXzRc7nPzqeGJpzLh2qzj-n/view?usp=sharing)


## Features
Real-time Messaging: Send and receive messages in real-time.
User Authentication: Secure user login and registration.
Message Status Tracking: Tracks whether messages have been seen or are still unseen.
Responsive UI: User-friendly and responsive interface.


## Tech Stack

### Backend:

- Node.js
- Drizzle ORM
- PostgreSQL (or other SQL databases)
- Express.js
- WebSocket (for real-time communication)

### Frontend:

- React
- Zustand (for state management)
- Axios (for API calls)
- Socket.io-client (for real-time updates


## Installation

### Prerequisites
Node.js (v14.x or later)
PostgreSQL (or another SQL database)
Git
### Backend Setup
Clone the repository:

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app/backend
```

### Install dependencies:

```bash

npm install
```
### Set up environment variables:

Create a .env file in the backend directory and add the following variables:

```makefile
PORT = 4000

ACCESS_TOKEN_SECRET =
DATABASE_PASSWORD=
DB_URL=

```
### Run database migrations:

Ensure Drizzle ORM is set up to run migrations.

```bash

npx drizzle-kit generate:pg
npx drizzle-kit migrate:pg
```
Start the backend server:

```bash

npm run dev
```
## Frontend Setup
### Navigate to the frontend directory:

```bash
cd ../frontend
```
### Install dependencies:

```bash

npm install
```
### Set up environment variables:

Create a .env file in the frontend directory and add the following variables:


### Start the frontend server:

```bash
npm run dev
```
## Usage
- Access the application: Open your browser and navigate to http://localhost:3000 to access the chat application.

- Register/Login: Create a new account or log in with an existing account.

- Start chatting: Select a user and start sending messages in real-time. Message status will be updated as seen/unseen.

## Project Structure
```bash

chat-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    ├── .env
    ├── package.json
    └── README.md
```


## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to write tests for your code and adhere to the coding standards.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

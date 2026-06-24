# HotelBooking

Hotel Booking App Using The MERN Stack With TypeScript & Redux 🤩

![screenshot](https://i.ibb.co/5Fprvgc/roomhotel.png)

## Features:

- Room reviews and ratings
- Room pagination
- Room search feature
- User profile with bookings
- Admin Room management
- Admin User management
- Admin Booking management

## Technology Stack:

- TypeScript
- Node js
- Express Js
- MongoDB
- JWT
- React
- React Bootstrap
- Redux
- React Paypal Button V2

## Usage

### Env Variables

Copy the example env files and update the values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Backend** (`backend/.env`) — chạy tại `http://localhost:5000`:

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
MONGO_URI=your mongodb uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your paypal client id
STRIPE_API_KEY=your stripe publishable key
```

**Frontend** (`frontend/.env`) — chạy tại `http://localhost:3000`:

```
PORT=3000
REACT_APP_API_URL=http://localhost:5000
```

## Install Dependencies

```bash
# Install all dependencies (from project root)
npm run install:all

# Or install separately
cd backend && npm install
cd frontend && npm install
```

### Run

```bash
# Run frontend (from project root)
npm run client

# Run backend (from project root)
npm run server

# Or run directly in each folder
cd frontend && npm start
cd backend && npm run dev
```

- Version: 1.0.0
- License: MIT
- Author: Said Mounaim


# Room Booking System for Co-working Spaces
## Overview
This project implements a backend web application for managing room reservations in a co-working space environment. It provides functionalities for administrators to manage rooms and slots, and for users to book available slots for meetings.

## Technology Stack
- Language: TypeScript
- Framework: Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT (JSON Web Tokens)
- Validation: Zod
- Error Handling: Custom middleware
- Deployment: Node.js
### Dependencies
- **Production Dependencies:**
  - `cors`: ^2.8.5
  - `dotenv`: ^16.4.5
  - `express`: ^4.19.2
  - `mongoose`: ^8.4.0
  - `zod`: ^3.23.8

- **Development Dependencies:**
  - "@eslint/js": "^9.4.0",
  - "@types/bcrypt": "^5.0.2",
  - "@types/cors": "^2.8.17",
  - "@types/eslint__js": "^8.42.3",
  - "@types/express": "^4.17.21",
  - "@types/jsonwebtoken": "^9.0.6",
  - "@types/mongoose": "^5.11.97",
  - "@typescript-eslint/eslint-plugin": "^7.13.0",
  - "@typescript-eslint/parser": "^7.13.0",
  - "eslint": "^8.57.0",
  - "prettier": "^3.3.2",
  - "typescript": "^5.4.5",
  - "typescript-eslint": "^7.13.0"
## Setup Instructions
### Clone the Repository

```bash
git clone <repository-url>
cd room-booking-system-server
```
### Install Dependencies

```bash
npm install
```
### Environment Variables

### Set up environment variables:
    Copy the `.env.example` file to `.env` and fill in your own values:
    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file with your own values:
    ```env
    NODE_ENV=development
    PORT=5000
    DB_URL=your_mongodb_connection_string
    ```
### Start the Server

#### Development Mode:

```bash
npm run start:dev
```
### Production Mode:

```bash
npm run build
npm run start:prod
```
**Access the application:**
    - **Local Server:** Open your browser and go to `http://localhost:5000/`
    - **Vercel Server:** Open your browser and go to [Express Server App on Vercel](https://room-booking-system-server.vercel.app/)

### Project Structure
```bash
room-booking-system-server/
│
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── errors/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── room/
│   │   │   ├── slot/
│   │   │   └── user/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

## Features
### Admin Actions
- #### Room Management:
  - Create, update, delete rooms.
  - Set room details: name, room number, floor number, capacity, price per slot, amenities.
  - Soft delete functionality.

- #### Slot Management:
  - Create time slots for rooms.
  - Define date, start time, and end time.
  - Check slot availability.

### User Actions
- #### Authentication:
  - User sign-up and login.
- #### Booking:
  - Book available slots.
  - Calculate total amount based on selected slots and price per slot.
  - View and manage personal bookings.
### API Endpoints
- #### Authentication:

   - `/api/auth/signup` (POST)
   - `/api/auth/login` (POST)
- #### Room Management:
   - `/api/rooms` (POST, GET)
   - `/api/rooms/:id` (GET, PUT, DELETE)
- #### Slot Management:
   - `/api/slots` (POST)
   - `/api/slots/availability` (GET)
- #### Booking Management:
   - `/api/bookings` (POST, GET)
   - `/api/my-bookings` (GET)
   - `/api/bookings/:id` (PUT, DELETE)
### Error Handling
- Custom middleware provides informative responses for validation errors, conflicts, and other issues.
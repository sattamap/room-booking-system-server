
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

#### Create a .env file in the root directory and define the following variables:

```bash
PORT=<port-number>
MONGODB_URI=<mongodb-uri>
JWT_SECRET=<jwt-secret>
```
### Start the Server

#### Development Mode:

```bash
npm run start:dev
```
### Production Mode:

```bash
npm run start:prod
```
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
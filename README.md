# Railway Booking System

A full-stack web application for managing train bookings and schedules. This system allows users to book train tickets and administrators to manage train schedules.

## Features

- User Authentication
- Train Ticket Booking
- Admin Dashboard
- Real-time Seat Availability
- Booking Management
- Date-based Train Search

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React DatePicker

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt.js


## Installation

1. Clone the repository
```bash
git clone https://github.com/decimator003/hungerbox_railway.git
cd hungerbox_railway


2. Install dependencies
cd backend
npm install

cd frontend
npm install


3. Create a .env file in the backend directory with the following variables:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret



## Running the application

1. Start the backend server
cd backend
npm run dev

2. Start the frontend server
cd frontend
npm run dev


## Features in Detail

User Features
1.Search trains by date
2.iew available seats
3.Book tickets
4.Cancel bookings
5.View booking history

Admin Features
1.Add/Edit train schedules
2.Manage bookings
3.View user details
4.Monitor seat availability


## API Endpoints
Trains
1.GET /api/trains - Get all trains
2.POST /api/trains - Add new train
3.GET /api/trains/:date - Get trains by date

Bookings
1.POST /api/bookings - Create new booking
2.GET /api/bookings - Get all bookings
3.DELETE /api/bookings/:id - Cancel booking

Users
1.POST /api/users/login - User login
2.POST /api/users/register - User registration
3.GET /api/users/profile - Get user profile


License
This project is licensed under the ISC License.

Authors
Varad Bane

Acknowledgments
React + Vite template
Express.js documentation
MongoDB documentation
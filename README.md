# 🚗 Vehicle Rental System API

A robust backend REST API for managing vehicle rentals, built with Node.js, Express, and PostgreSQL. This system handles user authentication, vehicle inventory management, and rental bookings with role-based access control.

**Live URL:** [Insert Live URL Here]  
_(Local Development: http://localhost:5000)_

## 🚀 Features

- **Authentication & Authorization**

  - Secure User & Admin Signup/Login
  - JWT-based session management
  - Role-Based Access Control (RBAC) covering Admin and Customer roles

- **Vehicle Management**

  - CRUD operations for vehicles (Cars, Bikes, SUVs, Vans)
  - Real-time availability tracking
  - Duplicate registration prevention

- **Booking System**

  - Seamless booking creation with date validation
  - Automatic total cost calculation
  - Status management (Active, Cancelled, Returned)
  - Automated vehicle status updates upon booking/return

- **User Management**
  - Profile management for customers
  - Admin controls for user oversight

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM/Query:** `pg` (node-postgres)
- **Authentication:** JSON Web Token (JWT) & bcrypt

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/TalhaShahidKhan/vehicle_rental_system_api.git
cd vehicle_rental_system_api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/vehicle_rental_db
JWT_SECRET=your_super_secret_key_here
```

### 4. Run the Server

The application uses `tsx` for development.

```bash
# Development Mode
npm run dev

# Build & Start Production
npm run build
npm start
```

## 📚 API Documentation

You can test the API using the provided **Postman Collection** included in this repository (`postman_collection.json`).

### Key Endpoints

| Method | Endpoint               | Description           | Access         |
| :----- | :--------------------- | :-------------------- | :------------- |
| `POST` | `/api/v1/auth/signup`  | Register new user     | Public         |
| `POST` | `/api/v1/auth/signin`  | Login user            | Public         |
| `GET`  | `/api/v1/vehicles`     | List all vehicles     | Public         |
| `POST` | `/api/v1/bookings`     | Create a booking      | Customer/Admin |
| `PUT`  | `/api/v1/bookings/:id` | Return/Cancel booking | Admin/Customer |

---

_Developed by Talha Shahid Khan_

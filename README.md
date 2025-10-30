# 🎵 Souveneer Records

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-1.24-009639?logo=nginx)

> A modern, full-stack e-commerce platform for vinyl record enthusiasts. Built with React, Node.js, and PostgreSQL.

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [License](#license)

## 🎯 Overview

Souveneer Records is a sophisticated e-commerce platform designed specifically for vinyl record collectors and enthusiasts. The application features a modern React frontend with Tailwind CSS for styling, a robust Node.js backend, and PostgreSQL for data persistence.

## ✨ Features

- 🛍️ **Rich Shopping Experience**
  - Intuitive product catalog with advanced filtering
  - Detailed product pages with vinyl specifications
  - Real-time inventory management
  - Shopping cart functionality

- 👤 **User Management**
  - Secure authentication system
  - User profiles with order history
  - Admin dashboard for inventory management
  - Role-based access control

- 🎵 **Discogs Integration**
  - Automated sync with Discogs database
  - Rich metadata for vinyl records
  - Accurate pricing information

- 🛒 **Order Processing**
  - Streamlined checkout process
  - Order tracking and management
  - Email notifications
  - Admin order fulfillment interface

## 🏗️ Architecture

```
                                Architecture Diagram
┌──────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Client  │───▶│     Nginx        │───▶│    Frontend     │───▶│     Backend     │
│ Browser  │     │ (Load Balancer) │     │  (React + Vite) │     │    (Node.js)    │
└──────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                                          │
                                                                          │
                                                                          ▼
                                                               ┌─────────────────┐
                                                               │    Database     │
                                                               │   (PostgreSQL)  │
                                                               └─────────────────┘
                                                                          │
                                                                          │
                                                                  Discogs Integration
```

### Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: PostgreSQL
- **Proxy/Load Balancer**: Nginx
- **API Documentation**: Swagger/OpenAPI
- **Container Platform**: Docker


## 📋 Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if running locally)

## 🚀 Getting Started

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/souveneer_records.git
    cd souveneer_records
    ```

2. **Frontend Setup**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3. **Backend Setup**

    ```bash
    cd backend
    npm install
    npm run dev
    ```

4. **Docker Deployment**

    ```bash
    docker-compose up -d
    ```

The application will be available at:

- Frontend (dev): [http://localhost:5173](http://localhost:5173)
- Backend API (dev): [http://localhost:3000](http://localhost:3000)
- Admin Dashboard (dev): [http://localhost:5173/admin](http://localhost:5173/admin)

If you run the application with Docker Compose the services are fronted by Nginx on port 80. In that case use:

- Frontend (docker): http://localhost/
- Backend API (docker via proxy): http://localhost/api/


## 💻 Development

### Frontend Structure

```tree
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── CheckoutForm.jsx      # Checkout process component
│   │   ├── FilterSidebar.jsx     # Product filtering interface
│   │   ├── Navbar.jsx            # Navigation component
│   │   ├── OrderDetailsModal.jsx # Order information display
│   │   ├── OrderTable.jsx        # Order management interface
│   │   ├── ProductCard.jsx       # Product display component
│   │   └── Sidebar.jsx          # Navigation sidebar
│   ├── pages/         # Route components
│   │   ├── AccountPage.jsx       # User account management
│   │   ├── AdminDashboard.jsx    # Admin control panel
│   │   ├── CatalogPage.jsx       # Product listing
│   │   ├── CheckoutPage.jsx      # Purchase completion
│   │   ├── Homepage.jsx          # Landing page
│   │   └── ProductDetail.jsx     # Detailed product view
│   ├── context/       # React Context providers
│   │   └── AuthContext.jsx       # Authentication state
│   ├── api/           # API integration
│   │   └── stubs.js             # API endpoint stubs
│   └── utils/         # Utility functions and hooks
│       └── hooks.js             # Custom React hooks
```

### Backend Structure

```tree
backend/
├── src/
│   ├── routes/       # API routes
│   │   ├── catalog.js   # Product management
│   │   ├── orders.js    # Order processing
│   │   └── users.js     # User management
│   ├── db/          # Database models and migrations
│   │   ├── index.js     # Database connection
│   │   └── schema.sql   # Database schema
│   └── server.js    # Express application
```

### Key Components

- **Authentication**: JWT-based auth system with role-based access control
  - Admin route protection via `AuthContext`
  - User session management
  - Secure password handling

- **API Integration**: RESTful endpoints with error handling
  - Product catalog management
  - User authentication
  - Order processing
  - Discogs synchronization

- **Database**: PostgreSQL with Discogs synchronization
  - Prefixed tables for Discogs data (`sr_discogs_`)
  - Efficient query optimization
  - Data integrity constraints

- **UI Components**: Reusable React components with Tailwind CSS
  - Responsive design
  - Accessible interface
  - Consistent styling

## 🐳 Docker Deployment

The application is fully containerized using Docker with the following services:

```yaml
services:
  frontend:    # React application
    build: ./frontend
    ports: ["5173:5173"]
    
  backend:     # Node.js API
    build: ./backend
    ports: ["3000:3000"]
    
  database:    # PostgreSQL instance
    image: postgres:latest
    
  nginx:       # Reverse proxy
    image: nginx:alpine
    ports: ["80:80"]
```

## 📚 API Documentation

The API is fully documented using Swagger/OpenAPI specification. Interactive API documentation is available at `/api/docs` when running the development server. The documentation includes request/response schemas, authentication requirements, and example requests.

### Authentication

The API uses JWT (JSON Web Token) for authentication and authorization:

- **Bearer Token Authentication**
  ```http
  Authorization: Bearer <your_jwt_token>
  ```

- **Access Levels**
  - Public: No authentication required
  - User: Valid JWT token required
  - Admin: Valid JWT token with admin role required

- **Token Management**
  - Tokens expire after 24 hours
  - Refresh token functionality available
  - Invalidation on logout

### Role-Based Access Control (RBAC)

- **User Roles**
  - `user`: Basic authenticated user
  - `admin`: Administrative access

- **Protected Resources**
  - User-specific endpoints require valid JWT
  - Admin endpoints require admin role
  - Rate limiting varies by role

### Accessing the Documentation

1. Start the backend server (dev):

  ```bash
  cd backend
  npm run dev
  ```

2. Visit the docs in your browser

- If running the backend locally (dev) visit: http://localhost:3000/api/docs
- If running the full stack via Docker Compose (the backend is proxied by Nginx) visit: http://localhost/api/docs

Note: The backend service in the docker-compose setup is exposed internally and proxied through the `nginx` service. That means `http://localhost:3000` will not be reachable from your host when using `docker-compose up` unless you explicitly publish the backend port in `docker-compose.yml`.

## 🔐 Authentication & UI changes (recent)

This project recently refactored the authentication flow and top navigation. Key changes:

- The previous left `Sidebar` navigation has been removed — navigation links were moved into the top navigation bar (`Navbar`).
- Top nav now includes: Catalog, New Arrivals, Merch, About.
- There is no explicit "Account" or "Admin Dashboard" link in the UI. Instead:
  - Clicking the user name/avatar in the top-right opens a profile modal containing profile information and order history.
  - Login is performed in a centered modal dialog (email + password). The login modal includes a link to create an account which opens a small registration form.
- Admin behavior: if a user with role `admin` logs in successfully, they are immediately redirected to the Admin Dashboard (`/admin`).

### Seeded admin user

An admin user is seeded into the initial SQL schema so an admin is available on first database setup. Credentials:

- Email: `admin@admin.com`
- Password: `admin123`

This user is inserted via `backend/src/db/schema.sql` using a precomputed bcrypt password hash. The INSERT is idempotent and will not overwrite an existing user with the same email.

If you prefer to create the admin via a migration step instead of the SQL seed, run the backend migration script after the database is available (the repository includes a `migrate` npm script placeholder).

### Core Endpoints

#### Catalog Management

- `GET /api/catalog` - List all products
  - Query parameters: `page`, `limit`, `sort`, `genre`, `year`
  - Response: Paginated list of vinyl records

- `GET /api/catalog/:id` - Get product details
  - Response: Detailed vinyl record information including Discogs metadata

- `POST /api/catalog` - Add new product (Admin)
  - Request: Product details including Discogs ID
  - Response: Created product information

- `PUT /api/catalog/:id` - Update product (Admin)
  - Request: Updated product details
  - Response: Modified product information

- `DELETE /api/catalog/:id` - Remove product (Admin)
  - Response: Deletion confirmation

#### User Management

- `POST /api/users/register` - Create account
  - Request: User registration details
  - Response: User profile with JWT token

- `POST /api/users/login` - Authenticate user
  - Request: Email and password
  - Response: JWT token and user info

- `GET /api/users/profile` - Get user profile
  - Auth: JWT token required
  - Response: User profile information

- `PUT /api/users/profile` - Update profile
  - Auth: JWT token required
  - Request: Updated profile information
  - Response: Modified user profile

#### Order Processing

- `POST /api/orders` - Create order
  - Auth: JWT token required
  - Request: Order details with items
  - Response: Created order information

- `GET /api/orders` - List user orders
  - Auth: JWT token required
  - Query parameters: `status`, `page`, `limit`
  - Response: Paginated list of orders

- `GET /api/orders/:id` - Get order details
  - Auth: JWT token required
  - Response: Detailed order information

- `PUT /api/orders/:id` - Update order status (Admin)
  - Auth: Admin JWT token required
  - Request: Updated order status
  - Response: Modified order information

### API Versioning

The API uses URL versioning (e.g., `/api/v1/`) to ensure backward compatibility as new features are added.

### Rate Limiting

- Anonymous requests: 100 requests per hour
- Authenticated users: 1000 requests per hour
- Admin users: 5000 requests per hour

## 🔧 Configuration

Key configuration files:

- `frontend/.env` - Frontend environment variables

    ```env
    VITE_API_URL=http://localhost:3000
    VITE_DISCOGS_API_KEY=your_key_here
    ```

- `backend/.env` - Backend configuration

    ```env
    PORT=3000
    DB_CONNECTION=postgresql://user:pass@localhost:5432/souveneer
    JWT_SECRET=your_secret_here
    ```

- `docker-compose.yml` - Container orchestration
- `nginx.conf` - Reverse proxy configuration


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Node.js](https://nodejs.org/)
- Database by [PostgreSQL](https://www.postgresql.org/)
- Vinyl data from [Discogs API](https://www.discogs.com/developers)

## 📌 Important Notes & TODOs

- [ ] Implement real authentication system (JWT/session)
- [ ] Integrate Discogs API for product synchronization
- [ ] Replace placeholder assets in `/assets`
- [ ] Set up automated testing pipeline
- [ ] Add error tracking and monitoring
- [ ] Implement email notification system
- [ ] Set up CI/CD pipeline
- [ ] Add data backup strategy
- [ ] Implement rate limiting

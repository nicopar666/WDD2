# Inventory Management System

A full-stack web application for managing inventory with user authentication.

## Tech Stack

- **Backend**: Laravel 11 + PHP 8.2+ + PostgreSQL + Sanctum
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL or MySQL

### Installation

1. **Backend Setup**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### API Endpoints (v1)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/register` | Register user | No |
| POST | `/api/v1/login` | Login user | No |
| POST | `/api/v1/logout` | Logout user | Yes |
| GET | `/api/v1/inventory` | List products | Yes |
| POST | `/api/v1/inventory` | Create product | Yes |
| PUT | `/api/v1/inventory/{id}` | Update product | Yes |
| DELETE | `/api/v1/inventory/{id}` | Delete product | Yes |

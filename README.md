# Inventory Management System

A full-stack web application for managing inventory with user authentication.

## 🚀 Features

- **User Authentication**: Register and login functionality
- **Inventory Management**: Add, view, and manage products
- **Modern UI**: Clean, responsive design with React
- **RESTful API**: Express.js backend with MongoDB
- **Real-time Updates**: Live inventory tracking

## 🏗️ Project Structure

```
inventory-management-app/
├── backend/             # Backend (Node.js + Express + MongoDB)
│   ├── config/         # Database configuration
│   ├── controller/     # Business logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── index.js        # Server entry point
│   └── package.json    # Backend dependencies
├── frontend/           # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service functions
│   │   └── main.jsx    # React entry point
│   ├── index.html      # HTML template
│   └── package.json    # Frontend dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with modern features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/inventory-app
   JWT_SECRET=your-secret-key-here
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or for development
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/*`

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Inventory
- `GET /api/inventory` - Get all products
- `POST /api/inventory` - Add new product

## 🔧 Development

### Available Scripts

**Backend (backend/)**
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

**Frontend (frontend/)**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure Guide

**Adding a new feature:**
1. **Backend**: Add route → controller → model
2. **Frontend**: Add page → update routing → add API service

**File locations:**
- **API logic**: `server/controller/`
- **Database schemas**: `server/models/`
- **Routes**: `server/routes/`
- **React components**: `client/src/components/`
- **Pages**: `client/src/pages/`
- **API services**: `client/src/services/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For questions or issues, please open an issue in the repository.
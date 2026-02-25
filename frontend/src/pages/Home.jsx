import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h2>My App</h2>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" className="nav-button">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My App</h1>
          <p className="hero-subtitle">
            Your one-stop solution for managing your inventory efficiently.
          </p>
          <Link to="/register" className="hero-button">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
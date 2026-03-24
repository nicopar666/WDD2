import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-brand">My App</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/inventory" className="nav-link">Inventory</Link>
          <Link to="/login" className="nav-button">Login</Link>
        </div>
      </nav>

      <section className="hero">
        <h1 className="hero-title">Welcome to My App</h1>
        <p className="hero-subtitle">
          Your one-stop solution for managing your inventory efficiently.
        </p>
        <Link to="/register" className="hero-button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

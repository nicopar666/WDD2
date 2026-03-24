import './Card.css';

export default function Card({ title, children, error, success }) {
  return (
    <div className="card">
      {title && <h1 className="card-title">{title}</h1>}
      {error && <div className="card-error">{error}</div>}
      {success && <div className="card-success">{success}</div>}
      {children}
    </div>
  );
}

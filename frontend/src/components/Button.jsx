import './Button.css';

export default function Button({ children, variant = 'primary', loading = false, disabled, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

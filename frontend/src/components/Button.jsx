import React from 'react';
import '../components/Button.css';

const Button = ({
  children,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
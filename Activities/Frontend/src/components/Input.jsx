import React from 'react';
import './Input.css';

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </>
  );
};

export default Input;
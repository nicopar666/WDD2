import React from 'react';
import './Card.css';  

const Card = ({
  children, 
  title, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="card-container" {...props}>
      <div className={`card ${className}`}>
        {title && (
          <h1 className="card-title">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
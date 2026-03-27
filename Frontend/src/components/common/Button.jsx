import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', onClick, type = 'button', className = '' }) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;

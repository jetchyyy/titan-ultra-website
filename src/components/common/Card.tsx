// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'elevated';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick
}) => {
  const baseStyles = 'rounded-lg p-6 transition duration-300';
  
  const variantStyles = {
    default: 'bg-gray-900 border border-gray-800',
    hover: 'bg-gradient-to-br from-gray-900 to-black border border-red-600 hover:shadow-lg hover:shadow-red-600/50 cursor-pointer',
    elevated: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 shadow-lg shadow-yellow-400/20'
  };

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
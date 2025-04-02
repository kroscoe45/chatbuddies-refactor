// src/components/common/Card/Card.tsx
import React, { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  // Title to display at the top of the card
  title: string;
  // Main content of the card
  content: ReactNode;
  // Buttons to display at the bottom of the card
  buttons?: ReactNode;
  // Additional CSS class names
  className?: string;
}

const Card: React.FC<CardProps> = ({
                                     title,
                                     content,
                                     buttons,
                                     className = '',
                                   }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
      </div>

      <div className="card-content">
        {content}
      </div>

      {buttons && (
        <div className="card-actions">
          {buttons}
        </div>
      )}
    </div>
  );
};

export { Card };
import { forwardRef } from 'react';
import "./Card.css";

const Card = forwardRef(({ 
  image,
  title,
  subtitle,
  onClick,
  className = '',
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`branch-card ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Image */}
      {image && (
        <div className="branch-card-image">
          <img src={image} alt={title || 'Branch'} loading="lazy" />
        </div>
      )}

      {/* Content */}
      <div className="branch-card-content">
        {title && <h3 className="branch-card-title">{title}</h3>}
        {subtitle && <p className="branch-card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '500px' }}>
      <div className="glass-card">
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary-500)', marginBottom: '8px' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          <Home size={16} /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

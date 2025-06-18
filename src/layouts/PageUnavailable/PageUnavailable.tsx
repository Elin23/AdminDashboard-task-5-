import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageUnavailable.css';
import { Link } from 'react-router-dom';

const PageUnavailable: React.FC = () => {
  return (
    <div className="w-100 error-page p-8 d-flex align-items-center justify-content-center vh-100 text-center">
      <div className="text-center animate-slide-in">
        <h1 className="display-3 fw-bold" style={{ color: 'var(--primary-color)' }}>
          Page Not Available
        </h1>
        <p className="lead" style={{ color: 'var(--gray-color-01)' }}>
          Sorry, this page is not available right now.
        </p>
        <Link to="/products" className="btn btn-warning mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageUnavailable;

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Award, LogOut, CheckCircle, Clock, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to={isAuthenticated ? '/dashboard' : '/login'} className="brand">
          <div className="brand-icon">
            <Award size={22} />
          </div>
          <span className="brand-text">QuizMaster</span>
        </Link>

        {isAuthenticated ? (
          <div className="nav-links">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Dashboard
            </NavLink>
            <NavLink
              to="/quiz"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <CheckCircle size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Take Quiz
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Clock size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              History
            </NavLink>

            <div className="nav-user">
              <div className="user-badge" title={user?.email}>
                <div className="user-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span>{user?.name || 'Student'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                title="Log out securely"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="nav-links">
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/game', label: 'The Game' },
    { path: '/team', label: 'Meet the Team' },
    { path: '/team/profiles', label: 'Profiles' },
    { path: '/ylab', label: 'Y-Lab' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/results', label: 'Results' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          <img src="/images/mosesbrownsymbol.avif" alt="Moses Brown Logo" className="navbar-logo" />
          MB Robotics
        </Link>

        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>

          <button
            className={`navbar-toggler ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="navbar-link admin-link"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-lock"></i> Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

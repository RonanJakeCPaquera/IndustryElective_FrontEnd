import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
  return (
    <header className="header">
      <h1>LIC Management System</h1>
      <nav className="nav-buttons">
        <Link to="/">Home</Link>
        {loggedIn && <Link to="/student-management">Student Management</Link>}
        {loggedIn && <Link to="/reservation-management">Reservation Management</Link>}
        {loggedIn && <Link to="/booking-management">Booking Management</Link>}
        {loggedIn && <Link to="/equipment-management">Equipment Management</Link>}
        {!loggedIn && <Link to="/login">Login</Link>}
        {!loggedIn && <Link to="/register">Register</Link>}
        {loggedIn && (
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/paymentMethods">Payment Methods</Link></li>
          <li><Link to="/equipments">Equipments</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

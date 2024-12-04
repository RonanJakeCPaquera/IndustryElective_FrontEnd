import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CreateReservation.css';

function CreateReservation() {
  const [reservationData, setReservationData] = useState({ reservationDate: '', reservationTime: '', status: 'Pending' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const hasData = localStorage.getItem('reservationData');

    if (hasData) {
      navigate('/booking-management')
    }
  }, [navigate]);
  // Middleware to check authentication


  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/reservations/createReservation', reservationData)
      .then(() => {
        localStorage.setItem('reservationData', true);
        setMessage('Reservation created successfully!');
        setTimeout(() => navigate('/booking-management'), 1500); // Redirect after 1.5s
      })
      .catch(() => {
        setMessage('Error creating reservation');
      });
  };

  return (
    <div className="create-reservation-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          
        </ul>
      </nav>

      <h2>Create Reservation</h2>
      <form className="create-reservation-form" onSubmit={handleSubmit}>
        <label>Reservation Date:</label>
        <input
          type="date"
          value={reservationData.reservationDate}
          onChange={(e) => setReservationData({ ...reservationData, reservationDate: e.target.value })}
          required
        />
        <label>Reservation Time:</label>
        <input
          type="time"
          value={reservationData.reservationTime}
          onChange={(e) => setReservationData({ ...reservationData, reservationTime: e.target.value })}
          required
        />
        <button type="submit">Next</button>
      </form>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default CreateReservation;

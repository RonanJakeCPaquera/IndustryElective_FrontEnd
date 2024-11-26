import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateReservation() {
  const [reservationData, setReservationData] = useState({ reservationDate: '', reservationTime: '', status: 'Pending' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/reservations/createReservation', reservationData)
      .then(() => {
        setMessage('Reservation created successfully!');
        setTimeout(() => navigate('/booking-management'), 1500);
      })
      .catch(() => {
        setMessage('Error creating reservation');
      });
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
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
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateReservation;

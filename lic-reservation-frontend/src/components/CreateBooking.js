import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBooking.css';
 
function CreateBooking() {
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    duration: 1,
    name: '',
    contactNumber: '',
    email: '',
    paymentAmount: 0,
    startTime: '',
    endTime: '',
    status: 'Upcoming',
    bookingType: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // Validate the email domain
    if (!bookingData.email.endsWith('@cit.edu')) {
      setMessage('Invalid email domain. Use @cit.edu email.');
      return;
    }
 
    axios
      .post('/bookings/createBooking', bookingData)
      .then(() => {
        setMessage('Booking created successfully!');
        setTimeout(() => navigate('/equipment-management'), 1500);
      })
      .catch(() => {
        setMessage('Error creating booking');
      });
  };
 
  return (
    <div className="create-booking-container">
      <h2>Create Booking</h2>
      <form className="create-booking-form" onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input
          type="text"
          placeholder="UserName"
          value={bookingData.name}
          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
          required
        />
 
        <label>Contact Number:</label>
        <input
          type="tel"
          placeholder="Enter Contact Number"
          value={bookingData.contactNumber}
          onChange={(e) => setBookingData({ ...bookingData, contactNumber: e.target.value })}
          required
        />
 
        <label>Email (@cit.edu only):</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={bookingData.email}
          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
          required
        />
 
        <label>Payment Amount:</label>
        <input
          type="number"
          placeholder="Enter Payment Amount"
          value={bookingData.paymentAmount}
          onChange={(e) => setBookingData({ ...bookingData, paymentAmount: parseFloat(e.target.value) })}
          min="0"
          required
        />
 
        <label>Booking Date:</label>
        <input
          type="date"
          value={bookingData.bookingDate}
          onChange={(e) => setBookingData({ ...bookingData, bookingDate: e.target.value })}
          required
        />
 
        <label>Time to Come In:</label>
        <input
          type="time"
          value={bookingData.startTime}
          onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
          required
        />
 
        <label>Time to End Out:</label>
        <input
          type="time"
          value={bookingData.endTime}
          onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
          required
        />
 
        <label>Booking Type:</label>
        <select
          value={bookingData.bookingType}
          onChange={(e) => setBookingData({ ...bookingData, bookingType: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Booking Type
          </option>
          <option value="Room">Room</option>
          <option value="Equipment">Equipment</option>
          <option value="Event">Event</option>
          <option value="Other">Other</option>
        </select>
 
        <button type="submit">Next</button>
      </form>
 
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}
 
export default CreateBooking;
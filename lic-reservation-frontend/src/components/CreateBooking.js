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
    startTime: '',
    endTime: '',
    status: 'Upcoming',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  // Function to check if booking exists for the same date
  const checkExistingBooking = async (date) => {
    try {
      const response = await axios.get(`/bookings/checkBookingDate/${date}`);
      if (response.data.exists) {
        setMessage('Error: Booking already exists for this date. Please choose another date.');
        return true; // Booking already exists
      }
      return false; // No existing booking
    } catch (error) {
      setMessage('Error checking booking date');
      return false;
    }
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    // Validate the email domain
    if (!bookingData.email.endsWith('@cit.edu')) {
      setMessage('Invalid email domain. Use @cit.edu email.');
      return;
    }
 
    // Check if a booking already exists for the selected date
    const bookingExists = await checkExistingBooking(bookingData.bookingDate);
    if (bookingExists) {
      return; // If booking exists, prevent form submission
    }
 
    // Proceed to create the booking
    axios
      .post('/bookings/createBooking', bookingData)
      .then(() => {
        setMessage('Booking created successfully!');
        setTimeout(() => navigate('/equipment-management'), 1500);
      })
      .catch((e) => {
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
 
        <button type="submit">Next</button>
</form>
 
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
</div>
  );
}
 
export default CreateBooking;
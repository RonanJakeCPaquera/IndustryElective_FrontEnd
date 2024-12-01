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
    userId: 1, // Example user ID, adjust based on your app's user management
  });
  const [message, setMessage] = useState('');
  const [nextAvailableDate, setNextAvailableDate] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    // Basic Email validation (only @cit.edu domain allowed)
    if (!bookingData.email.endsWith('@cit.edu')) {
      setMessage('Invalid email domain. Please use your @cit.edu email.');
      return;
    }
 
    try {
      // Conflict Check: Query backend to check if the selected booking date is fully booked
      const response = await axios.get('/bookings/checkConflict', {
        params: { bookingDate: bookingData.bookingDate },
      });
 
      if (response.data.conflict) {
        setMessage(`The selected date is fully booked. The next available date is ${response.data.nextAvailableDate}.`);
        setNextAvailableDate(response.data.nextAvailableDate);
        return;  // Exit early if a conflict is found
      }
 
      // Create Booking: If no conflict, proceed with creating the booking
      const createResponse = await axios.post('/bookings/createBooking', bookingData);
 
      // Handle success response and navigate to another page after booking is created
      if (createResponse.status === 200) {
        setMessage('Booking created successfully!');
        setTimeout(() => navigate('/equipment-management'), 1500);  // Redirect to another page after a successful booking
      }
    } catch (error) {
      // Error handling for API requests
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Error creating booking'}`);
      } else {
        setMessage('Network error. Please try again later.');
      }
    }
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
 
      {message && (
        <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
 
      {nextAvailableDate && (
        <p>The next available date is {nextAvailableDate}.</p>
      )}
    </div>
  );
}
 
export default CreateBooking;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [counters, setCounters] = useState({});
    const [editingId, setEditingId] = useState(null); // Tracks the booking being edited
    const [editingBooking, setEditingBooking] = useState(null); // Stores the current booking details being edited
 
    useEffect(() => {
        fetchBookings();
    }, []);
 
    const fetchBookings = async () => {
        try {
            const response = await axios.get('/bookings/getAllBookings');
            const bookingsData = response.data;
            setBookings(bookingsData);
 
            // Initialize counters with unique IDs from fetched bookings
            const initialCounters = {};
            bookingsData.forEach((booking, index) => {
                initialCounters[booking.bookingId] = index + 1; // Start counters from 1
            });
            setCounters(initialCounters);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
 
    const incrementCounter = (bookingId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [bookingId]: prevCounters[bookingId] + 1,
        }));
    };
 
    const updateBooking = async (id, updatedDetails) => {
        try {
            await axios.put(`/bookings/updateBooking/${id}`, updatedDetails);
            fetchBookings(); // Refresh bookings
            cancelEdit(); // Exit edit mode
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };
 
    const deleteBooking = async (id) => {
        try {
            await axios.delete(`/bookings/deleteBooking/${id}`);
            fetchBookings(); // Refresh bookings
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };
 
    const formatDateTime = (dateString, timeString) => {
        const date = new Date(dateString);
        const time = new Date(`1970-01-01T${timeString}`);
       
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
       
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
       
        return `${formattedDate} at ${formattedHours}:${formattedMinutes} ${ampm}`;
    };
 
    const startEdit = (booking) => {
        setEditingId(booking.bookingId); // Set the ID of the booking being edited
        setEditingBooking({ ...booking }); // Clone the booking into the editing state
    };
 
    const handleEditChange = (field, value) => {
        setEditingBooking((prev) => ({
            ...prev,
            [field]: value, // Update the specific field
        }));
    };
 
    const cancelEdit = () => {
        setEditingId(null); // Exit edit mode
        setEditingBooking(null); // Clear editing state
    };
 
    return (
        <div>
            <h1>Booking System</h1>
            <h2>Current Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.bookingId}>
                        {editingId === booking.bookingId ? (
                            <div>
                                <p>
                                    <strong>Edit Name:</strong>
                                    <input
                                        type="text"
                                        value={editingBooking.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                    />
                                </p>
                                <p>
                                    <strong>Edit Contact Number:</strong>
                                    <input
                                        type="text"
                                        value={editingBooking.contactNumber}
                                        onChange={(e) => handleEditChange('contactNumber', e.target.value)}
                                    />
                                </p>
                                <p>
                                    <strong>Edit Email:</strong>
                                    <input
                                        type="email"
                                        value={editingBooking.email}
                                        onChange={(e) => handleEditChange('email', e.target.value)}
                                    />
                                </p>
                                <p>
                                    <strong>Edit Payment Amount:</strong>
                                    <input
                                        type="number"
                                        value={editingBooking.paymentAmount}
                                        onChange={(e) => handleEditChange('paymentAmount', e.target.value)}
                                    />
                                </p>
                                <button onClick={() => updateBooking(booking.bookingId, editingBooking)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p><strong>({counters[booking.bookingId] || 1}) Name:</strong> {booking.name}</p>
                                <p><strong>Contact Number:</strong> {booking.contactNumber}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Payment Amount:</strong> {`pesos ${booking.paymentAmount}`}</p>
                                <p><strong>Start Time:</strong> {formatDateTime(booking.bookingDate, booking.startTime)}</p>
                                <p><strong>End Time:</strong> {formatDateTime(booking.bookingDate, booking.endTime)}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <button onClick={() => startEdit(booking)}>Edit</button>
                                <button onClick={() => deleteBooking(booking.bookingId)}>Delete</button>
                                <button
                                    onClick={() => {
                                        updateBooking(booking.bookingId, { ...booking, status: 'Completed' });
                                        incrementCounter(booking.bookingId); // Increment specific booking counter
                                    }}
                                >
                                    Mark as Completed
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default BookingList;
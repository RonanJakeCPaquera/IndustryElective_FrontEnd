import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete, MdCheckCircle } from 'react-icons/md';  // Importing Material Design icons
 
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
 
            // Sort bookings by bookingDate and startTime (ascending order)
            bookingsData.sort((a, b) => {
                const dateA = new Date(a.bookingDate + 'T' + a.startTime);
                const dateB = new Date(b.bookingDate + 'T' + b.startTime);
                return dateA - dateB;
            });
 
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
        <div className="booking-list-container">
            <h1>Booking System</h1>
            <h2>Current Bookings</h2>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>                        
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId}>
                            {editingId === booking.bookingId ? (
                                <>
                                    <td>{counters[booking.bookingId]}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingBooking.name}
                                            onChange={(e) => handleEditChange('name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingBooking.contactNumber}
                                            onChange={(e) => handleEditChange('contactNumber', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            value={editingBooking.email}
                                            onChange={(e) => handleEditChange('email', e.target.value)}
                                        />
                                    </td>
                                    <td>{formatDateTime(booking.bookingDate, booking.startTime)}</td>
                                    <td>{formatDateTime(booking.bookingDate, booking.endTime)}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        <button className="save-button" onClick={() => updateBooking(booking.bookingId, editingBooking)}>
                                            Save
                                        </button>
                                        <button className="cancel-button" onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{counters[booking.bookingId] || 1}</td>
                                    <td>{booking.name}</td>
                                    <td>{booking.contactNumber}</td>
                                    <td>{booking.email}</td>
                                    <td>{formatDateTime(booking.bookingDate, booking.startTime)}</td>
                                    <td>{formatDateTime(booking.bookingDate, booking.endTime)}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => startEdit(booking)}>
                                            <MdEdit />
                                        </button>
                                        <button className="delete-button" onClick={() => deleteBooking(booking.bookingId)}>
                                            <MdDelete />
                                        </button>
                                        <button
                                            className="complete-button"
                                            onClick={() => {
                                                updateBooking(booking.bookingId, { ...booking, status: 'Completed' });
                                                incrementCounter(booking.bookingId); // Increment specific booking counter
                                            }}
                                        >
                                            <MdCheckCircle />
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
export default BookingList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [counters, setCounters] = useState({});

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

    return (
        <div>
            <h1>Booking System</h1>
            <h2>Current Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.bookingId}>
                        <p><strong>({counters[booking.bookingId] || 1}) Name:</strong> {booking.name}</p>
                        <p><strong>Contact Number:</strong> {booking.contactNumber}</p>
                        <p><strong>Email:</strong> {booking.email}</p>
                        <p><strong>Payment Amount:</strong> {`pesos ${booking.paymentAmount}`}</p>
                        <p><strong>Start Time:</strong> {formatDateTime(booking.bookingDate, booking.startTime)}</p>
                        <p><strong>End Time:</strong> {formatDateTime(booking.bookingDate, booking.endTime)}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <button 
                            onClick={() => {
                                updateBooking(booking.bookingId, { ...booking, status: 'Completed' });
                                incrementCounter(booking.bookingId); // Increment specific booking counter
                            }}
                        >
                            Mark as Completed
                        </button>
                        <button onClick={() => deleteBooking(booking.bookingId)}>
                            Delete Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete, MdCheckCircle } from 'react-icons/md';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [counters, setCounters] = useState({});
    const [editingId, setEditingId] = useState(null); // Tracks the booking being edited
    const [editingBooking, setEditingBooking] = useState(null); // Stores current booking details during editing

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/bookings/getAllBookings');
            const bookingsData = response.data;

            bookingsData.sort((a, b) => {
                const dateA = new Date(a.bookingDate + 'T' + a.startTime);
                const dateB = new Date(b.bookingDate + 'T' + b.startTime);
                return dateA - dateB;
            });

            setBookings(bookingsData);

            const initialCounters = {};
            bookingsData.forEach((booking, index) => {
                initialCounters[booking.bookingId] = index + 1;
            });
            setCounters(initialCounters);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const updateBooking = async (id, updatedDetails) => {
        try {
            await axios.put(`/bookings/updateBooking/${id}`, updatedDetails);
            fetchBookings(); // Refresh bookings list after updating
            cancelEdit(); // Exit edit mode
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`/bookings/deleteBooking/${id}`);
            fetchBookings(); // Refresh bookings list after deletion
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
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDate} at ${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const startEdit = (booking) => {
        setEditingId(booking.bookingId);
        setEditingBooking({ ...booking });
    };

    const handleEditChange = (field, value) => {
        setEditingBooking((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingBooking(null);
    };

    return (
        <div className="booking-list-container">
            <h1>Booking System</h1>
            <h2>Current Bookings</h2>
            <div className="table-container">
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
                                            <button
                                                className="save-button"
                                                onClick={() => updateBooking(booking.bookingId, editingBooking)}
                                            >
                                                Save
                                            </button>
                                            <button className="cancel-button" onClick={cancelEdit}>
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{counters[booking.bookingId]}</td>
                                        <td>{booking.name}</td>
                                        <td>{booking.contactNumber}</td>
                                        <td>{booking.email}</td>
                                        <td>{formatDateTime(booking.bookingDate, booking.startTime)}</td>
                                        <td>{formatDateTime(booking.bookingDate, booking.endTime)}</td>
                                        <td>{booking.status}</td>
                                        <td>
                                            <button
                                                className="edit-button"
                                                onClick={() => startEdit(booking)}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteBooking(booking.bookingId)}
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                className="complete-button"
                                                onClick={() =>
                                                    updateBooking(booking.bookingId, { ...booking, status: 'Completed' })
                                                }
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
            <style jsx>{`
                .booking-list-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0 auto;
                }

                .table-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    width: 100%;
                    overflow-x: auto;
                }

                .booking-table {
                    border-collapse: collapse;
                    width: 90%;
                    max-width: 1200px;
                    text-align: center;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border: 1px solid #ddd;
                    background-color: #f9f9f9;
                }

                .booking-table th,
                .booking-table td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                .booking-table th {
                    background-color: maroon; /* Updated to maroon */
                    color: white;
                    font-weight: bold;
                }

                .booking-table tr:hover {
                    background-color: #ddd; /* Row hover effect */
                }

                button {
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #2196F3; /* Button hover effect */
                }

                .edit-button:hover {
                    color: #4CAF50;
                }

                .delete-button:hover {
                    color: #f44336;
                }

                .complete-button:hover {
                    color: #2196F3;
                }
            `}</style>
        </div>
    );
};

export default BookingList;

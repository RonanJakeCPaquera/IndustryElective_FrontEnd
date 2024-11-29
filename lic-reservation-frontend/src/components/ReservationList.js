import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [counters, setCounters] = useState({});

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservations/getAllReservations');
            console.log("Fetched Reservations:", response.data); // Debug response
            const reservationData = response.data;

            // Add a fallback for missing or invalid startTime values
            const updatedReservations = reservationData.map((reservation) => ({
                ...reservation,
                startTime: reservation.startTime || "00:00:00", // Default time if missing
            }));

            setReservations(updatedReservations);

            const initialCounters = {};
            updatedReservations.forEach((reservation, index) => {
                initialCounters[reservation.reservationId] = index + 1; // Start counters at 1
            });
            setCounters(initialCounters);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const incrementCounter = (reservationId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [reservationId]: prevCounters[reservationId] + 1,
        }));
    };

    const deleteReservation = async (id) => {
        try {
            await axios.delete(`/reservations/deleteReservation/${id}`);
            fetchReservations();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        try {
            // Fallback for invalid or missing time strings
            if (!timeString || typeof timeString !== 'string') {
                console.warn("Invalid or missing timeString:", timeString);
                return "Invalid time";
            }

            // Split time string into components
            const [hoursStr, minutesStr] = timeString.split(':');
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);

            if (isNaN(hours) || isNaN(minutes)) {
                throw new Error("Invalid time format");
            }

            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        } catch (error) {
            console.error("Error formatting time:", error);
            return "Invalid time"; // Fallback for unrecognized formats
        }
    };

    return (
        <div>
            <h2>Reservation List</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.reservationId}>
                        <p><strong>({counters[reservation.reservationId] || 1}) Date:</strong> {formatDate(reservation.reservationDate)}</p>
                        <p><strong>Time:</strong> {formatTime(reservation.startTime)}</p>
                        <button 
                            onClick={() => incrementCounter(reservation.reservationId)}
                        >
                            Increment
                        </button>
                        <button onClick={() => deleteReservation(reservation.reservationId)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;

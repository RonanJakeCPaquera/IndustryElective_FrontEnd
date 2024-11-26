import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [counters, setCounters] = useState({});

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const response = await axios.get('/reservations/getAllReservations');
        console.log("Fetched Reservations:", response.data); // Debug response
        const reservationData = response.data;
        setReservations(reservationData);

        const initialCounters = {};
        reservationData.forEach((reservation, index) => {
            initialCounters[reservation.reservationId] = index + 1; // Start counters at 1
        });
        setCounters(initialCounters);
    };

    const incrementCounter = (reservationId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [reservationId]: prevCounters[reservationId] + 1,
        }));
    };

    const deleteReservation = async (id) => {
        await axios.delete(`/reservations/deleteReservation/${id}`);
        fetchReservations();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') {
            return "Invalid time"; // Handle missing or invalid time
        }

        // Attempt to parse time from common formats
        try {
            const timeParts = timeString.split(':');
            if (timeParts.length >= 2) {
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                return `${formattedHours}:${formattedMinutes} ${ampm}`;
            }

            const time = new Date(`1970-01-01T${timeString}`);
            if (!isNaN(time.getTime())) {
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                return `${formattedHours}:${formattedMinutes} ${ampm}`;
            }
        } catch (error) {
            console.error("Error parsing time:", error);
        }

        return "Invalid time"; // Fallback for unrecognized formats
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

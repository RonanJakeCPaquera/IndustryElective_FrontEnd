import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importing icons
 
const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});
 
    useEffect(() => {
        fetchReservations();
    }, []);
 
    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservations/getAllReservations');
            const reservationData = response.data;
   
            // Sort reservations by reservationDate in ascending order
            const sortedReservations = reservationData.sort((a, b) => {
                const dateA = new Date(a.reservationDate);
                const dateB = new Date(b.reservationDate);
                return dateA - dateB; // Ascending order
            });
   
            setReservations(sortedReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };
   
 
    const deleteReservation = async (id) => {
        try {
            await axios.delete(`/reservations/deleteReservation/${id}`);
            fetchReservations();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };
 
    const startEditing = (reservation) => {
        setEditingReservation(reservation.reservationId);
        setEditedDetails({
            date: reservation.reservationDate,
            time: reservation.reservationTime,
        });
    };
 
    const cancelEditing = () => {
        setEditingReservation(null);
        setEditedDetails({});
    };
 
    const saveChanges = async (id) => {
        try {
            // Combine date and time into a single object if needed
            const updatedReservation = {
                reservationDate: editedDetails.date,
                reservationTime: editedDetails.time,
            };
   
            // Send the PUT request to update the reservation
            await axios.put(`/reservations/updateReservation/${id}`, updatedReservation);
   
            // Fetch updated reservations list after saving changes
            fetchReservations();
   
            // Exit editing mode
            cancelEditing();
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };
   
 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
 
    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') return "Invalid time";
        const [hoursStr, minutesStr] = timeString.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        if (isNaN(hours) || isNaN(minutes)) return "Invalid time";
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
 
    return (
        <div>
            <h2>Reservation List</h2>
            <div className="table-container">
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, index) => (
                            <tr key={reservation.reservationId}>
                                <td>{index + 1}</td>
                                <td>
                                    {editingReservation === reservation.reservationId ? (
                                        <input
                                            type="date"
                                            value={editedDetails.date}
                                            onChange={(e) =>
                                                setEditedDetails({
                                                    ...editedDetails,
                                                    date: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        formatDate(reservation.reservationDate)
                                    )}
                                </td>
                                <td>
                                    {editingReservation === reservation.reservationId ? (
                                        <input
                                            type="time"
                                            value={editedDetails.time}
                                            onChange={(e) =>
                                                setEditedDetails({
                                                    ...editedDetails,
                                                    time: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        formatTime(reservation.reservationTime)
                                    )}
                                </td>
                                <td>
                                    {editingReservation === reservation.reservationId ? (
                                        <>
                                            <button onClick={() => saveChanges(reservation.reservationId)}>
                                                Save
                                            </button>
                                            <button onClick={cancelEditing}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditing(reservation)}>
                                            <MdEdit />
                                            </button>
                                            <button onClick={() => deleteReservation(reservation.reservationId)}>
                                            <MdDelete />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
 
            <style jsx>{`
                .table-container {
                    margin: 20px 0;
                    overflow-x: auto;
                }
 
                .reservation-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }
 
                .reservation-table th,
                .reservation-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
 
                .reservation-table th {
                    background-color: maroon;
                    color: white;
                    font-weight: bold;
                }
 
                .reservation-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
 
                .reservation-table tr:hover {
                    background-color: yellow;
                }
 
                button {
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                }
 
                button:hover {
                    background-color: #2196F3;
                }
            `}</style>
        </div>
    );
};
 
export default ReservationList;
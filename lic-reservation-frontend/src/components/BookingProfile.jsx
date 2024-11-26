import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingProfile() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings on component load
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings'); // Replace with your actual API endpoint
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings. Please try again later.');
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    bookingTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f5f5f5',
      borderBottom: '2px solid #ddd',
      textAlign: 'left',
      padding: '10px',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '10px',
      textAlign: 'left',
    },
    noBookings: {
      padding: '20px',
      textAlign: 'center',
      fontSize: '16px',
      color: '#666',
    },
  };

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Booking Profile</h2>
      {bookings.length === 0 ? (
        <div style={styles.noBookings}>No bookings found.</div>
      ) : (
        <table style={styles.bookingTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Booking ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Booking Date</th>
              <th style={styles.tableHeader}>Details</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{booking.id}</td>
                <td style={styles.tableCell}>{booking.name}</td>
                <td style={styles.tableCell}>{booking.date}</td>
                <td style={styles.tableCell}>{booking.details || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingProfile;

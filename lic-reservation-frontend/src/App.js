import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Import components
import CreateStudent from './components/CreateStudent';
import CreateReservation from './components/CreateReservation';
import CreateBooking from './components/CreateBooking';
import BookingList from './components/BookingList';
import CreatePaymentMethod from './components/CreatePaymentMethod';
import CreateEquipment from './components/CreateEquipment';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SummaryPage from './components/SummaryPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn === 'true'; // Convert string to boolean
  });

  const userName = localStorage.getItem('userName') || 'Guest'; // Retrieve the username from localStorage (default to 'Guest')

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('userName');
    alert('You have been logged out.');
  };

  const ProtectedRoute = ({ children }) => {
    return loggedIn ? children : <Navigate to="/login" />;
  };

  const Home = () => {
    const navigate = useNavigate();

    // Array of background images
    const backgroundImages = [
      '/images/photo7.jpg',
      '/images/photo2.jpg',
      '/images/photo3.jpg',
      '/images/photo6.jpg',
      '/images/photo8.jpg',
      '/images/photo3.jpg',
      '/images/photo9.jpg',
      '/images/photo5.jpg',
      '/HomePage.jpg',
     
    ];

    // State to manage current background image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Change background image every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 5000); // 5000ms = 5 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [backgroundImages.length]);

    const containerStyle = {
      backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Full viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
    };

    const contentStyle = {
      color: '#FFFFFF',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for readability
      maxWidth: '800px',
      textAlign: 'center',
    };

    const headingStyle = {
      fontSize: '2.5rem', // Larger font size for the heading
      marginBottom: '10px',
    };

    const paragraphStyle = {
      fontSize: '1.2rem', // Slightly larger font size for paragraphs
      lineHeight: '1.5', // Improve readability
    };

    const buttonStyle = {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#ff8c00',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
    };

    const handleStartBooking = () => {
      navigate('/student-management');
    };

    return (
      <div style={containerStyle}>
        {/* Welcome Section */}
        <div style={contentStyle}>
          <h1 style={headingStyle}>Welcome to LIC Management System</h1>
          <p style={paragraphStyle}>
            Simplify reservation management for students and staff with our easy-to-use system. Track equipment, manage
            bookings, and ensure efficient operations!
          </p>
          <button onClick={handleStartBooking} style={buttonStyle}>
            Start Booking
          </button>
        </div>

        {/* Key Features Section */}
        <section className="features" style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: '20px' }}>Key Features</h2>
          <div className="features-list" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                textAlign: 'center',
              }}
            >
              <h3>Reservation Tracking</h3>
              <p>Real-time dashboard to manage resources efficiently.</p>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                textAlign: 'center',
              }}
            >
              <h3>Usage Reports</h3>
              <p>Generate statistics and notifications for accountability.</p>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                textAlign: 'center',
              }}
            >
              <h3>Customization</h3>
              <p>Adaptable system to align with LIC librarian requirements.</p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>LIC Management System</h1>
          <nav className="nav-buttons">
            <Link to="/">Home</Link>
            {loggedIn && <span className="user-greeting">Hello, {userName}!</span>} {/* Display username */}
            {loggedIn && <Link to="/student-management">Booking</Link>}
            {loggedIn && <Link to="/summary">Summary</Link>}
            {!loggedIn && <Link to="/login">Login</Link>}
            {loggedIn && (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </nav>
        </header>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route
            path="/student-management"
            element={
              <ProtectedRoute>
                <CreateStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation-management"
            element={
              <ProtectedRoute>
                <CreateReservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-management"
            element={
              <ProtectedRoute>
                <CreateBooking />
                <BookingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment-management"
            element={
              <ProtectedRoute>
                <CreateEquipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-method-management"
            element={
              <ProtectedRoute>
                <CreatePaymentMethod />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <SummaryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

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

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [backgroundImages.length]);

    const containerStyle = {
      backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
    };

    const contentStyle = {
      color: '#FFFFFF',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      maxWidth: '800px',
      textAlign: 'center',
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
        <div style={contentStyle}>
          <h1>Welcome to LIC Management System</h1>
          <p>
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

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px 0',
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const footerColumnStyle = {
    flex: '1 1 200px',
    margin: '10px',
    textAlign: 'center',
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
        <img src="../logo.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
          <nav className="nav-buttons">
            <Link to="/">Home</Link>
            {loggedIn && <span className="user-greeting">Hello, {userName}!</span>}
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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

        {/* Static Footer */}
        <footer style={footerStyle}>
          <div style={footerColumnStyle}>
            <h4>TeknoLib</h4>
            <p>Contact us</p>
            <p>TeknoLib@gmail.com</p>
            <p>+1-2345-6789</p>
            <p>Cebu Institute of Technology University</p>
          </div>
          <div style={footerColumnStyle}>
            <h4>Products</h4>
            <p>Auctor volutpat</p>
            <p>Fermentum turpis</p>
            <p>Mi consequat</p>
            <p>Amet venenatis</p>
          </div>
          <div style={footerColumnStyle}>
            <h4>About</h4>
            <p>Cajegas, Angelo</p>
            <p>Tesaluna, Josh</p>
            <p>Bacalso, Michael</p>
            <p>Paquero, Ronan</p>
            <p>Cagampang, Emmanuel</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

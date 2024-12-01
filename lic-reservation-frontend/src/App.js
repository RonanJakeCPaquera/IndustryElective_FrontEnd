import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
 
// Import components
import CreateStudent from './components/CreateStudent';
import StudentList from './components/StudentList';
import CreateReservation from './components/CreateReservation';
import ReservationList from './components/ReservationList';
import CreateBooking from './components/CreateBooking';
import BookingList from './components/BookingList';
import CreatePaymentMethod from './components/CreatePaymentMethod';
import PaymentMethodList from './components/PaymentMethodList';
import CreateEquipment from './components/CreateEquipment';
import EquipmentList from './components/EquipmentList';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SummaryPage from './components/SummaryPage';
import PhotoGallery from './components/PhotoGallery'; // Import the Photo Gallery component
 
// Background and content styling
const containerStyle = {
  backgroundImage: "url('/HomePage.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh", // Full viewport height
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0",
};
 
const contentStyle = {
  color: '#FFFFFF',
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background for readability
  maxWidth: "800px",
  textAlign: "center",
};
 
const headingStyle = {
  fontSize: "2.5rem", // Larger font size for the heading
  marginBottom: "10px",
};
 
const paragraphStyle = {
  fontSize: "1.2rem", // Slightly larger font size for paragraphs
  lineHeight: "1.5", // Improve readability
};
 
const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#ff8c00",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "5px",
  fontSize: "1rem",
  cursor: "pointer",
};
 
function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn === 'true'; // Convert string to boolean
  });
 
  const userName = localStorage.getItem('userName') || 'Guest';
 
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
 
        {/* Photo Gallery Section */}
<section className="photo-gallery-section" style={{ marginTop: '40px' }}>
<PhotoGallery />
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
{loggedIn && <span className="user-greeting">Hello, {userName}!</span>}
            {loggedIn && <Link to="/student-management">Student Management</Link>}
            {loggedIn && <Link to="/reservation-management">Reservation Management</Link>}
            {loggedIn && <Link to="/booking-management">Booking Management</Link>}
            {loggedIn && <Link to="/equipment-management">Equipment Management</Link>}
            {loggedIn && <Link to="/payment-method-management">Payment Method Management</Link>}
            {loggedIn && <Link to="/summary">Summary</Link>}
            {!loggedIn && <Link to="/login">Login</Link>}
            {!loggedIn && <Link to="/register">Register</Link>}
            {!loggedIn && <Link to="/forgot-password">Forgot Password</Link>}
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
<div>
<CreateStudent />
<StudentList />
</div>
</ProtectedRoute>
            }
          />
<Route
            path="/reservation-management"
            element={
<ProtectedRoute>
<div>
<CreateReservation />
<ReservationList />
</div>
</ProtectedRoute>
            }
          />
<Route
            path="/booking-management"
            element={
<ProtectedRoute>
<div>
<CreateBooking />
<BookingList />
</div>
</ProtectedRoute>
            }
          />
<Route
            path="/equipment-management"
            element={
<ProtectedRoute>
<div>
<CreateEquipment />
<EquipmentList />
</div>
</ProtectedRoute>
            }
          />
<Route
            path="/payment-method-management"
            element={
<ProtectedRoute>
<div>
<CreatePaymentMethod />
<PaymentMethodList />
</div>
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
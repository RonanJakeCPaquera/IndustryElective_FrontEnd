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
//test tesaluna
function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn === 'true'; // Convert string to boolean
  });

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
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
      <div className="center-container">
        <h2>Welcome to the LIC Management System</h2>
        <p>Select a section from the navigation bar to get started!</p>
        <p>Do you want to start booking? Press the Start button.</p>
        <button onClick={handleStartBooking} className="start-booking-button">
      Start Booking
  </button>
</div>

    );
  };

  return (
    <Router>
      <div className="App">
      <header className="header" style={{ backgroundColor: '#8C363C' }}>
          <h1>LIC Management System</h1>
          <nav className="nav-buttons">
            <Link to="/">Home</Link>
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ onLoginSuccess }) => {
  // State for managing user input credentials (email and password)
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // State for managing error messages displayed to the user
  const [errorMessage, setErrorMessage] = useState('');

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Handles changes in input fields and updates the credentials state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Toggles the visibility of the password field
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handles form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setErrorMessage(''); // Resets error message

    try {
      // Sends login request to the backend
      const response = await axios.post('/api/auth/login', credentials);

      if (response.status === 200) {
        // Extracts the username from the email and stores it in local storage
        const username = credentials.email.split('@')[0];
        localStorage.setItem('userName', username);
        localStorage.setItem('loggedIn', 'true');

        // Calls the success callback and navigates to the home page
        onLoginSuccess();
        navigate('/');
      }
    } catch (error) {
      // Handles errors (e.g., invalid credentials or user not registered)
      if (error.response?.status === 404) {
        navigate('/register'); // Redirects to registration page if user not found
      } else {
        setErrorMessage('Invalid email or password'); // Displays error message
      }
    }
  };

  // Inline styles for various components
  const containerStyle = {
    backgroundImage: `url('/Wildcats.jpg')`, // Background image for the login page
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for the form
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#fbbf24', // Yellow button color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff', // Blue text for links
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        {/* Displays error message if login fails */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        {/* Input field for email */}
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        
        {/* Input field for password with visibility toggle */}
        <div style={{ position: 'relative', width: '95%' }}>
          <input
            style={inputStyle}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#007bff',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Login button */}
        <button style={buttonStyle} type="submit">
          Login
        </button>

        {/* Link to reset password */}
        <button
          style={linkButtonStyle}
          type="button"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>

        {/* Link to registration page */}
        <p>
          Don’t have an account?{' '}
          <button
            style={linkButtonStyle}
            type="button"
            onClick={() => navigate('/register')}
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
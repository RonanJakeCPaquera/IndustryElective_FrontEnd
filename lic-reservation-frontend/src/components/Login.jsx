import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.status === 200) {
        onLoginSuccess();
        navigate('/');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        navigate('/register');
      } else {
        setErrorMessage('Invalid email or password');
      }
    }
  };

  const containerStyle = {
    backgroundImage: `url('/Wildcats.jpg')`, // Specify your image file here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button style={buttonStyle} type="submit">
          Login
        </button>
        <button
          style={linkButtonStyle}
          type="button"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
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

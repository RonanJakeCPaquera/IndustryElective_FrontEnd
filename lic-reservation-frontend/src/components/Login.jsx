import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        onLoginSuccess(); // Log in the user
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      if (error.response.status === 404) {
        navigate('/register'); // Redirect to register if email not found
      } else {
        setErrorMessage('Invalid email or password');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="button" onClick={() => navigate('/forgot-password')}>
        Forgot Password?
      </button>
    </form>
  );
};

export default Login;

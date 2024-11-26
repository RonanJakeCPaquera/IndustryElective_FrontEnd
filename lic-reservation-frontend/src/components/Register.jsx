import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Regex for validating email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|cit\.edu)$/;

  const handleRegister = () => {
    // Check if email matches the required pattern
    if (!emailRegex.test(email)) {
      setErrorMessage(
        'Invalid email. Only emails ending with "@gmail" or "@cit.edu" are allowed.'
      );
      return;
    }

    // Proceed with registration if validation passes
    axios.post('/api/auth/register', { username, email, password })
      .then(response => {
        alert(response.data);
        navigate('/login');
      })
      .catch(error => alert(error.response.data));
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('/api/auth/forgot-password', null, {
        params: { email },
      });

      // Redirect to ResetPassword page with token
      if (response.data.token) {
        navigate(`/reset-password?token=${response.data.token}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <style>{`
        .forgot-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('/Forget.jpg'); /* Background image from public folder */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0;
        }

        .forgot-password-form {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .forgot-password-form input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .forgot-password-form button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .forgot-password-form button:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }
      `}</style>

      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

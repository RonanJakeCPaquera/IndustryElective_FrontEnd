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
          min-height: calc(100vh - 60px); /* Dynamically calculate height minus header and footer */
          background-image: url('/Forget.jpg'); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-top: 60px; /* Adjust for header spacing */
          padding-bottom: 60px; /* Adjust for footer spacing */
        }

        .forgot-password-form {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
          text-align: center;
          margin-top: 20px;
        }

        .forgot-password-form input {
          width: 95%;
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

        footer {
          display: flex;
          justify-content: space-around;
          align-items: flex-start; /* Top-align footer columns */
          flex-wrap: wrap;
          background-color: #333;
          color: white;
          padding: 20px 10px; /* Add padding for small screens */
          position: relative; /* Prevent footer from overlapping */
          bottom: 0;
          width: 100%;
        }

        footer div {
          flex: 1 1 200px;
          margin: 10px;
          text-align: center;
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

      <footer>
        <div>
          <h4>TeknoLib</h4>
          <p>Contact us</p>
          <p>TeknoLib@gmail.com</p>
          <p>+1-2345-6789</p>
          <p>Cebu Institute of Technology University</p>
        </div>
        <div>
          <h4>Products</h4>
          <p>Auctor volutpat</p>
          <p>Fermentum turpis</p>
          <p>Mi consequat</p>
          <p>Amet venenatis</p>
        </div>
        <div>
          <h4>About</h4>
          <p>Cajegas, Angelo</p>
          <p>Tesaluna, Josh</p>
          <p>Bacalso, Michael</p>
          <p>Paquero, Ronan</p>
          <p>Cagampang, Emmanuel</p>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;

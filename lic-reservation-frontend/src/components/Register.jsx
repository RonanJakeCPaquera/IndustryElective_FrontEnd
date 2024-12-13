// React and related libraries are imported
import React, { useState } from 'react'; // useState for managing component state
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation

const Register = () => {
  // State for storing user details
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    code: '', // Code entered by the user
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handles changes in input fields and updates the corresponding state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form behavior
    setErrorMessage(''); // Clears any previous error message

    // Validates the verification code
    if (userDetails.code !== '12345') {
      setErrorMessage('Invalid verification code. Please try again.');
      return; // Stops further execution if the code is incorrect
    }

    try {
      // Sends user details to the server for registration
      await axios.post('/api/auth/register', {
        email: userDetails.email,
        username: userDetails.username,
        password: userDetails.password,
      });

      // Saves user data in local storage upon successful registration
      localStorage.setItem('userName', userDetails.username);
      localStorage.setItem('loggedIn', 'true'); // Marks user as logged in

      navigate('/login'); // Redirects to the login page
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.'); // Sets an error message on failure
    }
  };

  return (
    <div>
      <style>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-image: url('/Registration.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0;
        }

        .auth-form {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 500px;
          text-align: center;
        }

        .auth-form input {
          width: 95%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .auth-form button {
          width: 100%;
          padding: 10px;
          background-color: #fbbf24;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .auth-form button:hover {
          background-color: #0056b3;
        }

        .toggle-password {
          margin-top: -10px;
          font-size: 14px;
          color: #007bff;
          cursor: pointer;
        }

        .toggle-password:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }

        .auth-link {
          color: #007bff;
          cursor: pointer;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-container">
        {/* Registration form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userDetails.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'} // Toggles input type between text and password
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)} // Toggles password visibility state
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </span>
          <input
            type="text"
            name="code"
            placeholder="Enter Verification Code"
            value={userDetails.code}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Register</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Displays error message if any */}
          <p>
            Already have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/login')}>
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

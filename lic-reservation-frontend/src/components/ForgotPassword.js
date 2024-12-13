import React, { useState } from 'react'; // Import React and useState for managing component state
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation between routes

const ForgotPassword = () => {
  // State for holding the email input value
  const [email, setEmail] = useState('');
  // State for holding any error message to display to the user
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for programmatically navigating to other routes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage(''); // Clear any existing error message

    try {
      // Make a POST request to the backend API for initiating the forgot-password process
      const response = await axios.post('/api/auth/forgot-password', null, {
        params: { email }, // Pass email as a query parameter
      });

      // If a token is received, redirect to the ResetPassword page with the token as a query parameter
      if (response.data.token) {
        navigate(`/reset-password?token=${response.data.token}`);
      }
    } catch (error) {
      // Set an error message if the API request fails
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Inline styles for the Forgot Password page */}
      <style>{`
        .forgot-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 60px); /* Dynamically calculate height minus header and footer */
          background-image: url('/Forget.jpg'); /* Background image for visual appeal */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-top: 60px; /* Adjust for header spacing */
          padding-bottom: 60px; /* Adjust for footer spacing */
        }

        .forgot-password-form {
          background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for a card-like effect */
          max-width: 400px; /* Limit form width */
          width: 100%;
          text-align: center; /* Center text alignment */
          margin-top: 20px;
        }

        .forgot-password-form input {
          width: 95%; /* Make input fields responsive */
          padding: 10px; /* Add padding for better usability */
          margin: 10px 0; /* Spacing between fields */
          border: 1px solid #ccc; /* Border style */
          border-radius: 5px; /* Rounded corners */
          font-size: 16px; /* Adjust font size */
        }

        .forgot-password-form button {
          width: 100%; /* Make button stretch across the form */
          padding: 10px;
          background-color: #fbbf24; /* Button background color */
          color: white; /* Button text color */
          border: none; /* Remove default border */
          border-radius: 5px; /* Rounded corners */
          font-size: 16px; /* Font size for button text */
          cursor: pointer; /* Change cursor to pointer */
        }

        .forgot-password-form button:hover {
          background-color: #0056b3; /* Darker color on hover */
        }

        .error-message {
          color: red; /* Error message color */
          margin-top: 10px; /* Spacing above error message */
        }
      `}</style>

      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          {/* Input field for email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email} // Bind input value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            required // Make this field mandatory
          />
          {/* Submit button */}
          <button type="submit">Submit</button>
          {/* Display error message if any */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

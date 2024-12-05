import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    code: '', // Code entered by the user
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
 
    // Check if the verification code is correct
    if (userDetails.code !== '12345') {
      setErrorMessage('Invalid verification code. Please try again.');
      return; // Prevent form submission
    }
 
    try {
      await axios.post('/api/auth/register', {
        email: userDetails.email,
        username: userDetails.username,
        password: userDetails.password,
      });
 
      // Save username to localStorage after successful registration
      localStorage.setItem('userName', userDetails.username);
      localStorage.setItem('loggedIn', 'true'); // Set login status to true
 
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };
 
  const footerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background
    color: 'white', // Light text
    padding: '10px',
    textAlign: 'center',
    borderRadius: '0px',
    display: 'flex', // Use flexbox for layout
    justifyContent: 'space-between', // Space out columns
    flexWrap: 'wrap', // Wrap content for smaller screens
    width: '100%', // Full width of the page
    maxWidth: '2200px', // Limit the maximum width
    marginTop: '0px', // Added space above the footer
  };
 
  const columnStyle = {
    flex: '1 1 200px', // Flexible width, min 200px
    marginBottom: '10px',
  };
 
  const headingStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
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
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Enter Verification Code"
            value={userDetails.code}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Register</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>
            Already have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/login')}>
              Login here
            </span>
          </p>
        </form>
      </div>
 
      {/* Footer */}
      <footer style={footerStyle}>
        {/* Column 1 */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>TeknoLib</h4>
          <p>Contact us</p>
          <p>TeknoLib@gmail.com</p>
          <p>+1-2345-6789</p>
          <p>Cebu Institute of Technology University</p>
        </div>
 
        {/* Column 2 */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Products</h4>
          <p>Auctor volutpat</p>
          <p>Fermentum turpis</p>
          <p>Mi consequat</p>
          <p>Amet venenatis</p>
        </div>
 
        {/* Column 3 */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>About</h4>
          <p>Cajegas, Angelo</p>
          <p>Tesaluna, Josh</p>
          <p>Bacalso, Michael</p>
          <p>Paquero, Ronan</p>
          <p>Cagampang, Emmanuel Jr.</p>
        </div>
      </footer>
    </div>
  );
};
 
export default Register;
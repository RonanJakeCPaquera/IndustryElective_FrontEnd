import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation

// The Logout component handles user logout functionality
function Logout({ onLogout }) {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to handle the logout process
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the authentication token from local storage
    onLogout(); // Call the logout handler passed as a prop to notify the parent component
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout {/* Render a button that triggers the logout process */}
    </button>
  );
}

export default Logout; // Export the component for use in other parts of the application

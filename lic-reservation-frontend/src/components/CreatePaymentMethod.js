import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePaymentMethod() {
  const [paymentData, setPaymentData] = useState({
    paymentAmount: 0,
    paymentDate: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate payment amount and date
    if (paymentData.paymentAmount <= 0) {
      setMessage('Payment amount must be greater than zero.');
      return;
    }

    if (!paymentData.paymentDate) {
      setMessage('Please select a valid payment date.');
      return;
    }

    axios
      .post('/paymentMethods/createPaymentMethod', paymentData)
      .then(() => {
        setMessage('Payment method created successfully!');
        setTimeout(() => navigate('/summary'), 1500); // Redirect to summary after success
      })
      .catch(() => {
        setMessage('Error creating payment method');
      });
  };

  const handleStartAgain = () => {
    navigate('/student-management'); // Redirect to start over
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create Payment Method</h2>
      <form onSubmit={handleSubmit}>
        {/* Payment Amount */}
        <label>Payment Amount:</label>
        <input
          type="number"
          placeholder="Enter Payment Amount"
          value={paymentData.paymentAmount}
          onChange={(e) => setPaymentData({ ...paymentData, paymentAmount: parseFloat(e.target.value) })}
          min="0"
          required
        />

        {/* Payment Date */}
        <label>Payment Date:</label>
        <input
          type="date"
          value={paymentData.paymentDate}
          onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
          required
        />

        <button
          type="submit"
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Finish
        </button>
      </form>

      {/* Feedback Message */}
      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}

      {/* Start Again Button */}
      <button
        onClick={handleStartAgain}
        style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Start Again
      </button>
    </div>
  );
}

export default CreatePaymentMethod;

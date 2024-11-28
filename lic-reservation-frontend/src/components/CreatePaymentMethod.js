import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePaymentMethod.css';

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
    <div className="payment-method-container">
      <h2>Create Payment Method</h2>
      <form className="payment-method-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-button">
          Finish
        </button>
      </form>

      {/* Feedback Message */}
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}

      {/* Start Again Button */}
      <button onClick={handleStartAgain} className="start-again-button">
        Start Again
      </button>
    </div>
  );
}

export default CreatePaymentMethod;

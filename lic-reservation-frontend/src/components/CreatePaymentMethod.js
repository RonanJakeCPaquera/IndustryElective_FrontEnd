import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePaymentMethod.css';

function CreatePaymentMethod() {
  const { state } = useLocation();
  const [paymentData, setPaymentData] = useState({
    paymentAmount: state?.paymentData?.paymentAmount || 0,
    paymentDate: state?.paymentData?.paymentDate || '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const isNotEmpty = (obj) => Object.keys(obj).length > 0;

  useEffect(() => {
    const equipmentData = JSON.parse(localStorage.getItem('equipmentData'));
    const hasPaymentData = JSON.parse(localStorage.getItem('paymentData')); 
    if (isNotEmpty(equipmentData)) {
      setPaymentData(equipmentData);
      
    }

    console.log(equipmentData)

    if (hasPaymentData) {
      navigate('/summary');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentData.paymentAmount <= 0) {
      setMessage('Payment amount must be greater than zero.');
      return;
    }

    if (!paymentData.paymentDate) {
      setMessage('Please select a valid payment date.');
      return;
    }

    try {
      await axios.post('/paymentMethods/createPaymentMethod', paymentData);
      localStorage.setItem('paymentData', true);

      // Remove other data after successful submission
      localStorage.removeItem('studentData');
      localStorage.removeItem('equipmentData');
      localStorage.removeItem('reservationData');
      localStorage.removeItem('bookingData');
      localStorage.removeItem('paymentData');

      setMessage('Payment method created successfully!');
      setTimeout(() => navigate('/summary'), 1500);
    } catch (error) {
      setMessage('Error creating payment method. Please try again.');
    }
  };

  return (
    <div className="payment-method-container">
      <h2>Create Payment Method</h2>
      <form className="payment-method-form" onSubmit={handleSubmit}>
        {/* Payment Amount */}
        <label htmlFor="paymentAmount">Payment Amount:</label>
        <input
          id="paymentAmount"
          type="number"
          placeholder="Enter Payment Amount"
          value={paymentData.paymentAmount}
          onChange={(e) =>
            setPaymentData({
              ...paymentData,
              paymentAmount: parseFloat(e.target.value) || 0,
            })
          }
          min="0"
          required
        />

        {/* Payment Date */}
        <label htmlFor="paymentDate">Payment Date:</label>
        <input
          id="paymentDate"
          type="date"
          value={paymentData.paymentDate}
          onChange={(e) =>
            setPaymentData({ ...paymentData, paymentDate: e.target.value })
          }
          required
        />

        <button type="submit" className="submit-button">
          Finish
        </button>
      </form>

      {/* Feedback Message */}
      {message && (
        <p
          className={`message ${
            message.includes('successfully') ? 'success' : 'error'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CreatePaymentMethod;

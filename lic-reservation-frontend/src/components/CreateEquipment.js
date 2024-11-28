import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEquipment.css';

function CreateEquipment() {
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    quantity: 1,
    type: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/equipments/createEquipment', equipmentData)
      .then(() => {
        setMessage('Equipment created successfully!');
        setTimeout(() => navigate('/payment-method-management'), 1500); // Redirect after success
      })
      .catch(() => {
        setMessage('Error creating equipment');
      });
  };

  return (
    <div className="create-equipment-container">
      <h2>Create Equipment</h2>
      <form className="create-equipment-form" onSubmit={handleSubmit}>
        {/* Equipment Name */}
        <label>Equipment Name:</label>
        <input
          type="text"
          placeholder="Enter Equipment Name"
          value={equipmentData.name}
          onChange={(e) => setEquipmentData({ ...equipmentData, name: e.target.value })}
          required
        />

        {/* Equipment Quantity */}
        <label>Equipment Quantity:</label>
        <input
          type="number"
          placeholder="Enter Equipment Quantity"
          value={equipmentData.quantity}
          onChange={(e) => setEquipmentData({ ...equipmentData, quantity: parseInt(e.target.value) })}
          min="1"
          required
        />

        {/* Equipment Type */}
        <label>Equipment Type:</label>
        <input
          type="text"
          placeholder="Enter Equipment Type"
          value={equipmentData.type}
          onChange={(e) => setEquipmentData({ ...equipmentData, type: e.target.value })}
          required
        />

        <button type="submit">Next</button>
      </form>

      {/* Feedback Message */}
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default CreateEquipment;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create Equipment</h2>
      <form onSubmit={handleSubmit}>
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
          Next
        </button>
      </form>

      {/* Feedback Message */}
      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default CreateEquipment;

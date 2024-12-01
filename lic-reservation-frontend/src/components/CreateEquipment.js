import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEquipment.css';

function CreateEquipment() {
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    quantity: 1,
    type: '', // Defaults to an empty string for validation
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const options = [{
    value: 'computer_lab',
    label: 'Computer Lab',
  }, {
    value: 'vr_sim',
    label: 'VR Simulator',
  },  {
    value: 'driving_sim',
    label: 'Driving Simulator',
  }, {
    value: 'discuss_room',
    label: 'Discussion Room',
  }];

  console.log(equipmentData);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/equipments/createEquipment', equipmentData)
      .then(() => {
        let amount = 50;

        switch (equipmentData.type) {
          case 'computer_lab':
            amount = 50;
            break;
          case 'vr_sim':
            amount = 30;
            break;
          case 'driving_sim':
            amount = 40;
            break;
          case 'discuss_room':
            amount = 20;
            break;
          default:
            amount = 0;
            break;
        }
        
        setMessage('Equipment created successfully!');
        
        setTimeout(() => navigate('/payment-method-management', {
          state: {
            paymentData: {
              paymentAmount: amount * equipmentData.quantity,
              paymentDate: new Date().toISOString().split('T')[0],
            }
          }
        }), 1500); // Redirect after success
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

        {/* Equipment Type (Dropdown) */}
        <label>Equipment Type:</label>
        <select
          value={equipmentData.type}
          onChange={(e) => setEquipmentData({ ...equipmentData, type: e.target.value })}
          required
        >
          <option value="" disabled>
            Choose Equipment
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          
        </select>

        <button type="submit">Next</button>
      </form>

      {/* Feedback Message */}
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default CreateEquipment;

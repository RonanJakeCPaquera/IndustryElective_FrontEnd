import React, { useState, useEffect } from 'react';
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
  const isNotEmpty = (obj) => Object.keys(obj).length > 0;
  useEffect(() => {
    const hasData = JSON.parse(localStorage.getItem('equipmentData') ?? '{}');
    if (isNotEmpty(hasData)) {
      navigate('/payment-method-management');
    }
  }, [navigate]);

  const options = [
    { value: 'computer_lab', label: 'Computer Lab - PHP 50.00' },
    { value: 'vr_sim', label: 'VR Simulator - PHP 30.00' },
    { value: 'driving_sim', label: 'Driving Simulator - PHP 40.00' },
    { value: 'discuss_room', label: 'Discussion Room - PHP 20.00' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (equipmentData.quantity <= 0 || isNaN(equipmentData.quantity)) {
      setMessage('Quantity must be a positive number');
      return;
    }

    try {
      await axios.post('/equipments/createEquipment', equipmentData);


      const prices = {
        computer_lab: 50,
        vr_sim: 30,
        driving_sim: 40,
        discuss_room: 20,
      };

      const amount = prices[equipmentData.type] * equipmentData.quantity;

      localStorage.setItem('equipmentData', JSON.stringify( {
        paymentAmount: amount,
        paymentDate: new Date().toISOString().split('T')[0],
      })); 

      setMessage('Equipment created successfully!');

      setTimeout(() => {
        navigate('/payment-method-management', {
          state: {
            paymentData: {
              paymentAmount: amount,
              paymentDate: new Date().toISOString().split('T')[0],
            },
          },
        });
      }, 1500);
    } catch (error) {
      setMessage('Error creating equipment. Please try again.');
      console.error('Error:', error);
    }
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
          onChange={(e) =>
            setEquipmentData({ ...equipmentData, name: e.target.value })
          }
          required
        />

        {/* Equipment Quantity */}
        <label>Equipment Quantity:</label>
        <input
          type="number"
          placeholder="Enter Equipment Quantity"
          value={equipmentData.quantity}
          onChange={(e) =>
            setEquipmentData({
              ...equipmentData,
              quantity: parseInt(e.target.value) || 1,
            })
          }
          min="1"
          required
        />

        {/* Equipment Type */}
        <label>Equipment Type:</label>
        <select
          value={equipmentData.type}
          onChange={(e) =>
            setEquipmentData({ ...equipmentData, type: e.target.value })
          }
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

export default CreateEquipment;

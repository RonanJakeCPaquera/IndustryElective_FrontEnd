import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [studentData, setStudentData] = useState({ name: '', program: '', year: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/students/createStudent', studentData)
      .then(() => {
        setMessage('Student created successfully!');
        setTimeout(() => navigate('/reservation-management'), 1500); // Redirect after 1.5s
      })
      .catch(() => {
        setMessage('Error creating student');
      });
  };

  return (
    <div>
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
          required
        />
        <label>Program:</label>
        <input
          type="text"
          value={studentData.program}
          onChange={(e) => setStudentData({ ...studentData, program: e.target.value })}
          required
        />
        <label>Year:</label>
        <input
          type="number"
          value={studentData.year}
          onChange={(e) => setStudentData({ ...studentData, year: e.target.value })}
          required
        />
        <button type="submit">Next</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateStudent;

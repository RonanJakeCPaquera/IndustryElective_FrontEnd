import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateStudent.css';

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
    <div className="create-student-container">
      <h2>Create Student</h2>
      <form className="create-student-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
          placeholder="Enter student name"
          required
        />
        <label>Program:</label>
        <input
          type="text"
          value={studentData.program}
          onChange={(e) => setStudentData({ ...studentData, program: e.target.value })}
          placeholder="Enter program"
          required
        />
        <label>Year:</label>
        <input
          type="number"
          value={studentData.year}
          onChange={(e) => setStudentData({ ...studentData, year: e.target.value })}
          placeholder="Enter year"
          required
        />
        <button type="submit">Next</button>
      </form>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default CreateStudent;

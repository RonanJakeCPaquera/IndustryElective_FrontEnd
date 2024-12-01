import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateStudent.css';

function CreateStudent() {
  const [studentData, setStudentData] = useState({ name: '', program: '', year: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const programs = [
    "Bachelor of Science in Architecture",
    "Bachelor of Science in Chemical Engineering",
    "Bachelor of Science in Civil Engineering",
    "Bachelor of Science in Computer Engineering",
    "Bachelor of Science in Electrical Engineering",
    "Bachelor of Science in Electronics Engineering",
    "Bachelor of Science in Industrial Engineering",
    "Bachelor of Science in Mechanical Engineering - Major in Computational Science",
    "Bachelor of Science in Mechanical Engineering - Major in Mechatronics",
    "Bachelor of Science in Mining Engineering",
    "Bachelor of Science in Accountancy",
    "Bachelor of Science in Management Accounting",
    "Bachelor of Science in Accounting Information Systems",
    "Bachelor of Science in Business Administration Major in Operations Management",
    "Bachelor of Science in Business Administration Major in General Business Management",
    "Bachelor of Science in Business Administration Major in Banking and Financial Management",
    "Bachelor of Science in Business Administration Major in Marketing Management",
    "Bachelor of Science in Business Administration Major in Human Resource Management",
    "Bachelor of Science in Business Administration Major in Quality Management",
    "Bachelor of Science in Business Administration Major in Business Analytics",
    "Bachelor of Science in Office Administration",
    "Bachelor in Public Administration",
    "Bachelor of Science in Hospitality Management",
    "Bachelor of Science in Tourism Management",
    "Bachelor of Science in Mathematics",
    "Bachelor of Science in Biology",
    "Bachelor of Arts in English Language with Applied Linguistics",
    "Bachelor of Arts in Communication",
    "Bachelor of Science in Psychology",
    "Bachelor of Multimedia Arts",
    "Bachelor of Elementary Education",
    "Bachelor of Secondary Education Major in English",
    "Bachelor of Secondary Education Major in Filipino",
    "Bachelor of Secondary Education Major in Math",
    "Bachelor of Secondary Education Major in Science",
    "Bachelor of Science in Nursing",
    "Bachelor of Science in Pharmacy",
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Criminology",
  ];

  const years = [1, 2, 3, 4, 5];

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
        <select
          value={studentData.program}
          onChange={(e) => setStudentData({ ...studentData, program: e.target.value })}
          required
        >
          <option value="" disabled>CHOOSE PROGRAM</option>
          {programs.map((program, index) => (
            <option key={index} value={program}>
              {program}
            </option>
          ))}
        </select>
        <label>Year:</label>
        <select
          value={studentData.year}
          onChange={(e) => setStudentData({ ...studentData, year: e.target.value })}
          required
        >
          <option value="" disabled>Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button type="submit">Next</button>
      </form>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default CreateStudent;

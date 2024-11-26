import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [counters, setCounters] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('/students/getAllStudents');
        const studentData = response.data;
        setStudents(studentData);

        // Initialize counters for each student
        const initialCounters = {};
        studentData.forEach((student, index) => {
            initialCounters[student.studentId] = index + 1; // Start counters at 1
        });
        setCounters(initialCounters);
    };

    const incrementCounter = (studentId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [studentId]: prevCounters[studentId] + 1,
        }));
    };

    const deleteStudent = async (id) => {
        await axios.delete(`/students/deleteStudent/${id}`);
        fetchStudents();
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.studentId}>
                        <p><strong>({counters[student.studentId] || 1}) Name:</strong> {student.name}</p>
                        <p><strong>Program:</strong> {student.program}</p>
                        <p><strong>Year:</strong> {student.year}</p>
                        <button 
                            onClick={() => incrementCounter(student.studentId)}
                        >
                            Increment
                        </button>
                        <button onClick={() => deleteStudent(student.studentId)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;

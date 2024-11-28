import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [editedStudent, setEditedStudent] = useState({
        name: '',
        program: '',
        year: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('/students/getAllStudents');
        const studentData = response.data;
        setStudents(studentData);
    };

    const handleEditClick = (studentId) => {
        const studentToEdit = students.find(student => student.studentId === studentId);
        setEditStudentId(studentId);
        setEditedStudent({
            name: studentToEdit.name,
            program: studentToEdit.program,
            year: studentToEdit.year
        });
    };

    const handleUpdate = async () => {
        const response = await axios.put(`/students/updateStudent/${editStudentId}`, editedStudent);
        if (response.status === 200) {
            fetchStudents(); // Reload the students list
            setEditStudentId(null); // Close the edit form
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent({
            ...editedStudent,
            [name]: value
        });
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
                        {editStudentId === student.studentId ? (
                            <div>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={editedStudent.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                                <input 
                                    type="text" 
                                    name="program"
                                    value={editedStudent.program}
                                    onChange={handleChange}
                                    placeholder="Enter program"
                                />
                                <input 
                                    type="text" 
                                    name="year"
                                    value={editedStudent.year}
                                    onChange={handleChange}
                                    placeholder="Enter year"
                                />
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={() => setEditStudentId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>Program:</strong> {student.program}</p>
                                <p><strong>Year:</strong> {student.year}</p>
                                <button onClick={() => handleEditClick(student.studentId)}>Edit</button>
                                <button onClick={() => deleteStudent(student.studentId)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;

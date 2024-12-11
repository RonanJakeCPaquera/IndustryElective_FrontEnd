import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importing icons

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
            alert('Student updated successfully!'); // Show success message
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
        const response = await axios.delete(`/students/deleteStudent/${id}`);
        if (response.status === 200) {
            fetchStudents();
            alert('Student deleted successfully!'); // Show success message
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <div className="table-container">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Program</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.studentId}>
                                <td>{student.studentId}</td>
                                <td>
                                    {editStudentId === student.studentId ? (
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={editedStudent.name}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                        />
                                    ) : (
                                        student.name
                                    )}
                                </td>
                                <td>
                                    {editStudentId === student.studentId ? (
                                        <input 
                                            type="text" 
                                            name="program"
                                            value={editedStudent.program}
                                            onChange={handleChange}
                                            placeholder="Enter program"
                                        />
                                    ) : (
                                        student.program
                                    )}
                                </td>
                                <td>
                                    {editStudentId === student.studentId ? (
                                        <input 
                                            type="text" 
                                            name="year"
                                            value={editedStudent.year}
                                            onChange={handleChange}
                                            placeholder="Enter year"
                                        />
                                    ) : (
                                        student.year
                                    )}
                                </td>
                                <td>
                                    {editStudentId === student.studentId ? (
                                        <>
                                            <button onClick={handleUpdate}>Update</button>
                                            <button onClick={() => setEditStudentId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(student.studentId)}>
                                            <MdEdit />
                                            </button>
                                            <button onClick={() => deleteStudent(student.studentId)}>
                                            <MdDelete />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .table-container {
                    margin: 20px 0;
                    overflow-x: auto;
                }

                .student-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }

                .student-table th,
                .student-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }

                .student-table th {
                    background-color: maroon;
                    color: white;
                    font-weight: bold;
                }

                .student-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }

                .student-table tr:hover {
                    background-color: yellow;
                }

                button {
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #2196F3;
                }
            `}</style>
        </div>
    );
};

export default StudentList;

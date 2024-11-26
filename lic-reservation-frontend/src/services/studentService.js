import axios from 'axios';

const createStudent = (student) => {
  return axios.post('/students/createStudent', student);
};

const getAllStudents = () => {
  return axios.get('/students/getAllStudents');
};

const updateStudent = (id, updatedDetails) => {
  return axios.put(`/students/updateStudent/${id}`, updatedDetails);
};

const deleteStudent = (id) => {
  return axios.delete(`/students/deleteStudent/${id}`);
};

export { createStudent, getAllStudents, updateStudent, deleteStudent };

import axios from 'axios';

const createEquipment = (equipment) => {
  return axios.post('/equipment/createEquipment', equipment);
};

const getAllEquipment = () => {
  return axios.get('/equipment/getAllEquipment');
};

const updateEquipment = (id, updatedDetails) => {
  return axios.put(`/equipment/updateEquipment/${id}`, updatedDetails);
};

const deleteEquipment = (id) => {
  return axios.delete(`/equipment/deleteEquipment/${id}`);
};

export { createEquipment, getAllEquipment, updateEquipment, deleteEquipment };

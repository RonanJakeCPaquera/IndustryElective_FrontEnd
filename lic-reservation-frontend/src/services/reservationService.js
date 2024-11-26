import axios from 'axios';

const createReservation = (reservation) => {
  return axios.post('/reservations/createReservation', reservation);
};

const getAllReservations = () => {
  return axios.get('/reservations/getAllReservations');
};

const updateReservation = (id, updatedDetails) => {
  return axios.put(`/reservations/updateReservation/${id}`, updatedDetails);
};

const deleteReservation = (id) => {
  return axios.delete(`/reservations/deleteReservation/${id}`);
};

export { createReservation, getAllReservations, updateReservation, deleteReservation };

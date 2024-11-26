import axios from 'axios';

const createBooking = (booking) => {
  return axios.post('/bookings/createBooking', booking);
};

const getAllBookings = () => {
  return axios.get('/bookings/getAllBookings');
};

const updateBooking = (id, updatedDetails) => {
  return axios.put(`/bookings/updateBooking/${id}`, updatedDetails);
};

const deleteBooking = (id) => {
  return axios.delete(`/bookings/deleteBooking/${id}`);
};

export { createBooking, getAllBookings, updateBooking, deleteBooking };

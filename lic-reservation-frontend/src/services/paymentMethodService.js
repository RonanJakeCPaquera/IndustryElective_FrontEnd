import axios from 'axios';

const createPaymentMethod = (paymentMethod) => {
  return axios.post('/paymentMethods/createPaymentMethod', paymentMethod);
};

const getAllPaymentMethods = () => {
  return axios.get('/paymentMethods/getAllPaymentMethods');
};

const updatePaymentMethod = (id, updatedDetails) => {
  return axios.put(`/paymentMethods/updatePaymentMethod/${id}`, updatedDetails);
};

const deletePaymentMethod = (id) => {
  return axios.delete(`/paymentMethods/deletePaymentMethod/${id}`);
};

export { createPaymentMethod, getAllPaymentMethods, updatePaymentMethod, deletePaymentMethod };

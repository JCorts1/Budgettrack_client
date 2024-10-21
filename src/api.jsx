import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust if necessary
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const fetchExpenditures = (token) => {
  return api.get('/expenditures', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createExpenditure = (data, token) => {
  return api.post('/expenditures', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

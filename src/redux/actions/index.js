import axios from 'axios';

export default axios.create({
  baseURL: 'https://ubusiziart-api.herokuapp.com',
});

export const userConfig = {
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('UBUSIZI_USER_TOKEN')}`,
  },
};

export const adminConfig = {
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('UBUSIZI_ADMIN_TOKEN')}`,
  },
};

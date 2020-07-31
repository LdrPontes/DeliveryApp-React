import axios from 'axios';

const token = sessionStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${token}`}
  });

  export const instance = axios.create({
    timeout: 1000
  });
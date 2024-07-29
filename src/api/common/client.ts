import { Env } from '@env';
import axios from 'axios';

import { useAuth } from '@/core';
export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: Env.API_URL,
});

// Add a request interceptor to set the Authorization header
client.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

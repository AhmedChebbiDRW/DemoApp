import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: Env.API_URL,
});

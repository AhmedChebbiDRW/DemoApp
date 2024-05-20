import { Env } from '@env';
import axios from 'axios';
export const clientTB = axios.create({
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6eyJfX2VudGl0eSI6IlJvbGUiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTE2VDEwOjE0OjUxLjU1OFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTE2VDEwOjE0OjUxLjU1OFoiLCJpZCI6MywibmFtZSI6IkNvbGxlY3Rpdml0eUFkbWluIn0sInNlc3Npb25JZCI6NzgsImNvbGxlY3Rpdml0eUlkIjoxLCJpYXQiOjE3MTYyMDgwODEsImV4cCI6MTcxNjQyNDA4MX0.PkOOzntAPAMcBoJtBp96CfWu2codA1M3pdc05GYbh60`,
  },
  baseURL: Env.API_URL_TB,
});

import axios from 'axios';

export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.BACKEND_TOKEN}`
  }
});

// lib/axiosInstance.ts
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 필요 시 (쿠키 전송 등)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;

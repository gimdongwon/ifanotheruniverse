import http from '../api';
import { AxiosResponse } from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    name: string;
    email: string;
  };
  error?: string;
}

export const login = async (
  payload: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  const res = await http.post('/api/auth/login', payload);
  return res;
};

export const logout = async (): Promise<AxiosResponse> => {
  const res = await http.post('/api/auth/logout');
  return res;
};

export const getMyInfo = async (): Promise<AxiosResponse> => {
  const res = await http.get(`/api/auth/me`);
  return res;
};

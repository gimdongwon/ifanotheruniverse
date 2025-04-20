import http from './api';
import { AxiosResponse } from 'axios';

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// 응답
export interface SignupResponse {
  message: string;
  user?: {
    name: string;
    email: string;
  };
  error?: string;
}

export const signup = async (
  payload: SignupRequest
): Promise<AxiosResponse<SignupResponse>> => {
  const res = await http.post(`/api/user/signup`, payload);
  return res;
};

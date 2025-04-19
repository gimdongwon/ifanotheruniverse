import axios from 'app/lib/api';
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
  const res = await axios.post(`/api/auth/signup`, payload);
  return res;
};

export const getMyInfo = async (): Promise<AxiosResponse> => {
  const res = await axios.get(`/api/auth/me`);
  return res;
};

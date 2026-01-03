import api from './api';

interface ILoginData {
  email: string;
  password?: string; 
}

interface IAuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}


export const login = async (data: ILoginData): Promise<IAuthResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const register = async (data: ILoginData & { name: string }): Promise<IAuthResponse> => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
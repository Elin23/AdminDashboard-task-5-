// src/services/AuthService.ts

import axios from 'axios';

const url = 'https://web-production-3ca4c.up.railway.app/api';

const AuthService = {
  async signUp(data: FormData) {
    const response = await axios.post(`${url}/register`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async signIn(email: string, password: string) {
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    return response.data;
  },

  async logout(token: string) {
    const response = await axios.post(
      `${url}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  },
};

export default AuthService;

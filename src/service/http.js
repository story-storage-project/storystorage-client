import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const API = axios.create({
  baseURL,
  timeout: 1500,
  withCredentials: true,
});

API.interceptors.request.use(
  req => req,

  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  res => {
    if (!res.data) {
      throw new Error('No data transferred');
    }

    return res.data;
  },

  async error => {
    const { config, response } = error;

    const currentError = {
      message: error.message,
      status: error?.response?.status,
      code: error.code,
      response: error?.response,
      error,
    };

    if (response && response.status === 401) {
      const originalRequest = config;
      try {
        const data = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });

        if (data.result === 'success') {
          return axios(originalRequest);
        }
      } catch (err) {
        throw currentError;
      }
    }

    throw currentError;
  },
);

export default API;

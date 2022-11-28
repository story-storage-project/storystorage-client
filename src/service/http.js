import axios from 'axios';

const baseURL =
  process.env.REACT_APP_BASE_URL || process.env.STORYBOOK_REACT_APP_BASE_URL;

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
    if (res.status !== 204 && !res.data) {
      throw new Error('No data transferred');
    }

    return res.data;
  },

  async error => {
    const { config: reqConfig, response } = error;

    const currentError = {
      message: error.message,
      status: error?.response?.status,
      code: error.code,
      response: error?.response,
      error,
    };

    if (response && response.status === 401) {
      const originalRequest = reqConfig;
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

    if (response?.status === 404) {
      window.history.pushState({}, '', '/not-found');
    }

    throw currentError;
  },
);

export default API;

import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 30000,
};

const axiosClient = axios.create({ ...config });

/*
axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const expiredInterceptor = logout => {
  return {
    expired: err => {
      return new Promise(function() {
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          logout();
        }
        throw err;
      });
    }
  };
};
*/

export { axiosClient };

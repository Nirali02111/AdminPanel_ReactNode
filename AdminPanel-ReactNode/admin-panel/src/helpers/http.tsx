import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER_URL}/v1`,
  timeout: 5000,
});
const getToken = () => {
  try {
    const data = localStorage.getItem("Userdata");
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData?.token;
    }
  } catch (e) {
    return null;
  }
};
// Interceptor for handling request errors
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling response errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.pathname = "/account/login";
    }
    if (error.response.status === 403) {
      window.location.pathname = "/forbidden";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

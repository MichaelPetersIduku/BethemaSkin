import axios from "axios";

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      console.error(`HTTP ${error.response.status} ${error.config.url} failed (correlationId=${error.response.headers["x-correlation-id"]})`);
    } else {
      console.error(`Network error calling ${error.config.url} : ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default httpClient;

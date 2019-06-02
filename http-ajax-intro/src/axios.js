import axios from 'axios';

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common['Authorization'] = "MY_AUTH_TOKEN_FROM_INSTANCE";
instance.defaults.headers.post['Content-Type'] = "application/json";

instance.interceptors.request.use(config => {
  console.log("INSTANCE", config);
  // Edit request config
  return config;
}, error => {
  console.log("INSTANCE", error.response);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log("INSTANCE", response);
  // Edit response config
  return response;
}, error => {
  console.log("INSTANCE", error.response);
  return Promise.reject(error);
})

export default instance;
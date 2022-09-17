import axios from 'axios';
import { notification } from '../App';

const instance = axios.create({
  baseURL: "https://api.ordermenu.store/api/v1",
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error?.response?.data?.message) {
    notification({
      title: error.response.statusText,
      description: error.response.data.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  } else {
    notification({
      title: "Something went wrong :(",
      description: '',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  return Promise.reject(error);
});

export default instance
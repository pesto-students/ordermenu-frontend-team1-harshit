import axios from 'axios';

// axios instance
const instance = axios.create({
  baseURL: `https://example.com/api`,
  timeout: 10000,
  // headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' }
});

// Create request, response & error handlers
const requestHandler = request => {
  // request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwibmFtZSI6IlNhbXBsZSIsImlhdCI6MTUxNjIzODIzfQ.ZEBwz4pWYGqgFJc6DIi7HdTN0z5Pfs4Lcv4ZNwMr1rs';

  return request;
};

const responseHandler = response => {
  if (response.status === 401) {
    window.location = '/login';
  }

  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};


// Configure request interceptors
instance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

// Configure request interceptors
instance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);


export default instance;
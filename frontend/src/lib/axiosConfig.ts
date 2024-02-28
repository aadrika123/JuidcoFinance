// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://teamwork.ddnsfree.com:3001/api/v1/finance",
  baseURL: "/api/v1/finance",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoRGF0YSI6eyJpZCI6MSwidXNlcl9pZCI6InExZXRVNiIsIm5hbWUiOiJKb2huIFNtaXRoIiwiZW1haWwiOiJIYXlsZXlfTGFya2luQGhvdG1haWwuY29tIiwiZGVzaWduYXRpb24iOnsiaWQiOjEsIm5hbWUiOiJQcm9qZWN0IE1hbmFnZXIifX0sImlhdCI6MTcwOTEwMzk1MCwiZXhwIjoxNzA5MzYzMTUwfQ.BKaGCBp8aADFtAj9qTWJ7jOUr6udFc5m_zNxTktXJcA`,
  },
  // You can add other default configurations here
});

export default instance;

// export default axios;

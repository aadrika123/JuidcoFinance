// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.232.70:8000/",
  // You can add other default configurations here
});

export default instance;

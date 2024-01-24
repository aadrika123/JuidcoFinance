// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  
  baseURL: "http://localhost:3001/",
  // You can add other default configurations here
});

export default instance;


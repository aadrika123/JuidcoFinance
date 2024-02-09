// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://teamwork.ddnsfree.com:3001/api/v1/finance",
  baseURL: "/api/v1/finance",
});

export default instance;

// export default axios;
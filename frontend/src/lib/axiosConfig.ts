// axiosConfig.js

import axios from "axios";
import Cookies from "js-cookie";

const userData = Cookies.get("loginData");
let user: any = "";
if (userData) {
  user = JSON.parse(userData);
}

const instance = axios.create({
  // baseURL: "http://localhost:5001/api/finance",   //// It's your backend baseUrl
  baseURL: `${process.env.backend}/api/finance`,     //// It's your local APIGetway baseUrl
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
  // You can add other default configurations here
});

export default instance;

// export default axios;

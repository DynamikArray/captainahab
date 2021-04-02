import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 30000,
};

const axiosClient = axios.create({ ...config });

export { axiosClient };

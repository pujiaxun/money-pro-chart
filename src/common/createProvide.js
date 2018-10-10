import axios from "axios";
const SERVER_PORT = 3456;
const $api = axios.create({
  baseURL: `http://localhost:${SERVER_PORT}/api`
});

export default () => {
  return {
    $api
  };
};

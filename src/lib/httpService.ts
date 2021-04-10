import axios from "axios";
import Cookies from "js-cookie";

const coo: string=Cookies.get('_prowara')!;
if(coo!==undefined) {
  axios.defaults.headers.common["Authorization"] = atob(coo);
}

export default {
  axios:axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  apiUrl: "http://localhost:6704/",
  apiClient: "http://localhost:6704/",
  // apiClient: "http://api.prowara.com/"
};

import axios from "axios";
import Cookies from "js-cookie";

const coo: string=Cookies.get('_prowara')!;
console.log("COKIES",coo);
if(coo!==undefined) {
  axios.defaults.headers.common["Authorization"] = atob(coo);
}

export default {
  axios:axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // apiUrl: "http://192.168.100.10:6704/",
  // apiClient: "http://localhost:6704/",
  apiUrl: "http://localhost:3000/",
  apiClient: "http://192.168.100.10:6704/"
  // apiClient: "http://api.prowara.com/"
};

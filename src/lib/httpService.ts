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
<<<<<<< HEAD
  apiUrl: "http://api.prowara.com/"
=======
  apiUrl: "http://localhost:6704/",
  // apiClient: "http://localhost:6704/",
  apiClient: "http://api.prowara.com/"
>>>>>>> 7527805a692247e975790f407bcdd37054fc9029
};

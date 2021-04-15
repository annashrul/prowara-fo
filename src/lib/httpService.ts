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
  apiUrl: "http://192.168.100.10:6704/",
  apiClient: "http://192.168.100.10:6704/"
  // apiUrl: "https://api.prowara.com/",
  // apiClient: "https://api.prowara.com/"
=======
  apiUrl: "http://192.168.100.95:3000/",
  // apiClient: "http://192.168.100.10:6704/"
  // apiUrl: "https://api.prowara.com/",
  apiClient: "https://api.prowara.com/"
>>>>>>> 0287802f45901414126f67ee4ce458ddfb0b52a5
};

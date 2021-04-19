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
  apiUrl: "http://localhost:3000/",
  // apiClient: "http://localhost:6704/",
  noData:'https://www.napro.id//assets/images/placeholder-no-data.png',
  // apiUrl: "https://api.prowara.com/",
  apiClient: "https://api.prowara.com/"
}

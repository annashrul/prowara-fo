// import jwtDecode from "jwt-decode";
import http from "./httpService";
import Cookies from "js-cookie";

const tokenKey = "token";

// http.setJwt (getJwt());
interface iUser { 
  id: string,
  foto: string,
  fullname: string,
  mobile_no: string,
  referral: string,
  status: number,
  created_at: string
 }


function setUser(datum: iUser) {
  Cookies.set('__uid', btoa(JSON.stringify(datum)), { expires: 7 });
}

function setToken(datum: string) {
  Cookies.set('_prowara', btoa(datum), { expires: 7 });

}
export function logout() {
  localStorage.removeItem(tokenKey);
}

function getUser() {
  const coo: string=Cookies.get('__uid')!;
  //  try {
  //    const datum:iUser= JSON.parse(atob(coo));
  //    return datum;
  // } catch (err) {
  //     // const datum:iUser= JSON.parse();
  //     console.log(Buffer.from(coo, 'base64').toString());
  //     return datum;
  // }
  console.log('coo',coo);
}

function getToken() {
  const coo: string=Cookies.get('_prowara')!;
  return coo;
}

export default {
  http,
  logout,
  setUser,
  getUser,
  getToken,
  setToken
};

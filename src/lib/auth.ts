// import jwtDecode from "jwt-decode";
import http from "./httpService";
import Cookies from "js-cookie";
import {iUser} from './interface'

const tokenKey = "token";

// http.setJwt (getJwt());


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
  //     return datum;
  // }
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

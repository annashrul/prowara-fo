import Cookies from "js-cookie";
import atob from 'atob';

const decode=(str:string)=>{return atob(str);}

const setCookie=(name:string,data:string)=>{
    Cookies.set(name, btoa(data), { expires: 1 });
}

const removeCookie=(name:string)=>{
    Cookies.remove(name);
}

const isEmptyObj=(obj:Object)=>{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const numFormat=(angka:string)=>{
    if(angka===undefined) return 0;
    const number_string = angka?.toString().replace(/[^,\d]/g, '');
    const split = number_string.split('.');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah+" Poin";
}

export default {
  numFormat,
  setCookie,
  removeCookie,
  decode,
  isEmptyObj
};

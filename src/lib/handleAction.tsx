import NProgress from 'nprogress'; //nprogress module
import Api from 'lib/httpService';
import Swal from 'sweetalert2'
import helper from './helper';

export const handleGet = async (url:string,callback:(data:any)=>void,isLoading:boolean=true)=>{
    
    if(isLoading)NProgress.start();
    try {
        const getData=await Api.get(url)
        if(isLoading)NProgress.done()
        const datum = getData.data.result;
        callback(datum);
    } catch (err) {
        if(isLoading)NProgress.done()
        if (err.message === 'Network Error') {
            helper.mySwal('Tidak dapat tersambung ke server!');
        }else{
          
            if(err.response!==undefined){
                if(err.response.data.msg!==undefined){
                        helper.mySwal(err.response.data.msg);
                }else{
                    helper.mySwal('Terjadi Kesalahan!');
                }
            }
        }
        
    }
}



export const handlePost = async(url:string,data:any,callback:(datum:any,isStatus:boolean,msg:string)=>void)=>{
    
    Swal.fire({
        title: 'Silahkan tunggu...',
        html: "Memproses permintaan.",
        willOpen: () => {
            Swal.showLoading()
        },
        showConfirmButton:false,
        willClose: () => {}
    })

    try {
        const submitData=await Api.post(url,data)
        setTimeout(
            function () {
                Swal.close()
                const datum = submitData.data;
                if(datum.status==='success'){
                    callback(datum,false,'Berhasil memproses permintaan.');
                }else{
                    callback(datum,true,'gagal memproses permintaan.');
                }
        },800)
    
    } catch (err) {
        setTimeout(
            function () {
                Swal.close()
                if (err.message === 'Network Error') {
                    helper.mySwal('Tidak dapat tersambung ke server!');
                }else{
                    if(err.response!==undefined){
                        if(err.response.data.msg!==undefined){
                            if(err.response.data.msg=="Masih ada transaksi yang belum selesai."){
                                helper.mySwalWithCallback(err.response.data.msg,()=>{
                                    callback(undefined,true,`/invoice/${btoa(err.response.data.result.kd_trx)}`)
                                })
                            }
                            else{
                                helper.mySwal(err.response.data.msg);
                            }
                        }else{
                            helper.mySwal('Terjadi Kesalahan!');
                        }
                    }
                }
        },800)
    }
}
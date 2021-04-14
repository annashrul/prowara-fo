import NProgress from 'nprogress'; //nprogress module
import Api from 'lib/httpService';
import Swal from 'sweetalert2'

export const handleGet = async (url:string,callback:(data:any)=>void)=>{
    NProgress.start();
    try {
        const getData=await Api.get(url)
        NProgress.done()
        const datum = getData.data.result;
        callback(datum);
    } catch (err) {
        console.log(err.response);
        NProgress.done()
        if (err.message === 'Network Error') {
            Swal.fire({
                title   : 'Perhatian !!!',
                html    :`Tidak dapat tersambung ke server!`,
                icon    : 'warning',
                showCancelButton: false,
                confirmButtonColor  : '#3085d6',
                confirmButtonText   : `Oke`,
            })
            
        }else{
            if(err.response.data){
                Swal.fire({
                    title   : 'Perhatian !!!',
                    html    :  "terjadi kesalahan",
                    icon    : 'warning',
                    showCancelButton: false,
                    confirmButtonColor  : '#3085d6',
                    confirmButtonText   : `Oke`,
                })
            }
            if(err.response.data.msg!==undefined){
                Swal.fire({
                    title   : 'Perhatian !!!',
                    html    :   err.response.data.msg,
                    icon    : 'warning',
                    showCancelButton: false,
                    confirmButtonColor  : '#3085d6',
                    confirmButtonText   : `Oke`,
                })
            }
        }
        
    }
}



export const handlePost = async(url:string,data:any,callback:(isStatus:boolean,msg:string)=>void)=>{
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
    
    const submitRegister=await Api.post(url,data)

    setTimeout(
        function () {
            Swal.close()
            const datum = submitRegister.data;
            if(datum.status==='success'){
                Swal.fire({
                    title   : 'Perhatian !!!',
                    html    :`${datum.msg}`,
                    icon    : 'warning',
                    showCancelButton: false,
                    confirmButtonColor  : '#3085d6',
                    confirmButtonText   : `Oke`,
                }).then(async (result) => {
                    if (result.value) {
                        callback(false,'Berhasil memproses permintaan.');
                    }
                })
            }else{
                Swal.fire({
                    title   : 'Perhatian !!!',
                    html    :`${datum.msg}`,
                    icon    : 'warning',
                    showCancelButton: false,
                    confirmButtonColor  : '#3085d6',
                    confirmButtonText   : `Oke`,
                }).then(async (result) => {
                    if (result.value) {
                        callback(true,'gagal memproses permintaan.');
                    }
                })
            }
      },800)
  } catch (err) {

    setTimeout(
        function () {
            Swal.close()
            // save token to localStorage
            if (err.message === 'Network Error') {
                Swal.fire({
                    title   : 'Perhatian !!!',
                    html    :`Tidak dapat tersambung ke server!`,
                    icon    : 'warning',
                    showCancelButton: false,
                    confirmButtonColor  : '#3085d6',
                    confirmButtonText   : `Oke`,
                })
                
            }else{
                if(err.response.data){
                    Swal.fire({
                        title   : 'Perhatian !!!',
                        html    :  "terjadi kesalahan",
                        icon    : 'warning',
                        showCancelButton: false,
                        confirmButtonColor  : '#3085d6',
                        confirmButtonText   : `Oke`,
                    })
                }
                if(err.response.data.msg!==undefined){
                    Swal.fire({
                        title   : 'Perhatian !!!',
                        html    :   err.response.data.msg,
                        icon    : 'warning',
                        showCancelButton: false,
                        confirmButtonColor  : '#3085d6',
                        confirmButtonText   : `Oke`,
                    })
                }
  
            }
      },800)
  
  }
}
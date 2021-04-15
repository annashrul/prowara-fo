import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { useRouter } from 'next/router'

import Api from 'lib/httpService'
import Helper from 'lib/helper';
import { handleGet } from 'lib/handleAction';
import { iContent } from 'lib/interface';
import moment from 'moment'

interface iInvoice{
    kode:string;
    datum:iContent
}   

const DetailBerita: React.FC<iInvoice> =({kode,datum})=> {
    const router = useRouter()
    return (
    <Layout title={`Invoice`}>
        <div className="container mt-6 lg:px-6 md:px-3">
           
            <div className="flex">
                <div className="rounded sm:w-full mt-8 min-h-0 bg-gray-800">
                    <div className="w-full flex justify-between p-3">
                        <div className="flex">
                            <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                                <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic"/>
                            </div>
                            <span className="pt-1 ml-2 font-bold text-sm text-white">Admin</span>
                        </div>
                        
                    </div>
                    <img className="w-full bg-contain" src={datum.picture} onError={(e)=>{e.target.onerror = null; e.target.src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG"}}/>
                    <div className="px-3 pb-2">
                        <div className="mt-5 mb-5 border-b-8 pb-5">
                            <span className="text-xl text-white font-bold mb-5">{datum.title}</span><br/>
                            <span className="text-md text-gray-200 font-medium">{moment(datum.created_at).format('YYYY-MM-DD hh:mm')}   </span>
                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-purple-700 bg-purple-100 dark:text-white dark:bg-purple-600">{datum.category}</span>
                        </div>
                        <div className="pt-1">
                            <div className="mb-2 text-md text-gray-300" style={{textAlign:"justify"}}>
                                <div dangerouslySetInnerHTML={{__html: datum.caption}}></div>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
            </div>
            
        </Layout>
    );
}



export async function getServerSideProps(ctx:NextPageContext) {
    // Parse
    const cookies = nookies.get(ctx)
    const { id_berita } = ctx.query;
    // const decodeKode = Helper.decode(id_berita as string);

    if(!cookies._prowara){
        return {
        redirect: {
            destination: '/auth/login',
            permanent: false,
        },
        }
    }else{
        Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
    }

    let datum:any=[];
   

    try {
        const getDetail = await Api.get(Api.apiUrl+"content/get/"+id_berita)
        if(getDetail.status===200){
            datum=getDetail.data.result;
            console.log("DETAIL",datum);
        }else{
            datum=[];
        }
    } catch (err) {
    }



    return { 
        props:{
            kode:id_berita,
            datum
        }
    }
}

export default DetailBerita;
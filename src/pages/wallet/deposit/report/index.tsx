import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications'
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import {iDeposit,iPagin} from 'lib/interface';
import { Pagination } from '@windmill/react-ui'
import NProgress from 'nprogress'; //nprogress module
import moment from 'moment'
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'

interface iReportInvestment {}


const ReportDeposit: React.FC<iReportInvestment> = () =>{
    const { addToast } = useToasts();
    const [arrDatum,setArrDatum]= useState<Array<iDeposit>>([]);
    const [arrData,setArrData]= useState<iPagin>();
    const [any,setAny]=useState("");
    useEffect(() => {
        handleLoadData("page=1&datefrom=2021-01-01&dateto=2021-12-12&perpage=1");
    }, []);
   
    const handleLoadData = async(val:string)=>{
        NProgress.start();
        try {
            let url = Api.apiClient+`transaction/deposit`;
            if(val!==null){
                url+=`?${val}`;
            }
            const getData=await Api.get(url)
            NProgress.done()
            if(getData.data.status==='success'){
                const datum = getData.data.result;
                setArrDatum(datum.data);
                console.log(datum);
                setArrData({
                    current_page:datum.current_page,
                    total:datum.total,
                    per_page:datum.per_page,
                });
            }else{
                addToast("Kesalahan pada server.", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        
        } catch (err) {
            NProgress.done()
            // save token to localStorage
            if (err.message === 'Network Error') {
                addToast("Tidak dapat tersambung ke server!", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                
            }else{
                if(err.response.data.msg!==undefined){
                addToast(err.response.data.msg, {
                    appearance: 'error',
                    autoDismiss: true,
                    })
                }else{
                addToast("Kesalahan pada server.", {
                    appearance: 'error',
                    autoDismiss: true,
                    })
                }
    
            }
        }
    }

    const handleSearch=()=>{
        console.log(any);
        handleLoadData(`page=1&q=${btoa(any)}`);
    }
    const handlePage=(pagenum:number)=>{
        console.log(pagenum);
        handleLoadData(`page=${pagenum}&datefrom=2021-01-01&dateto=2021-12-12&perpage=1`);

    }

    return (
        <Layout title="Report Investment">
            <div className="container mt-6 px-2 lg:px-7 mx-auto grid mb-20">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Laporan Deposit
                        </h2>
                       
                    </div>
                </div>
                <div className="shadow-md rounded my-6">
                <div className={"mt-4 flex"}>
                  <input 
                  className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                  placeholder="tulis kode trx atau catatan disini" 
                  value={any}
                  onChange={(event)=>setAny(event.target.value)}
                  onKeyPress={event=>{if(event.key==='Enter'){handleSearch();}}}
                  />
                  <button 
                    className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
                    onClick={(event)=>{event.preventDefault();handleSearch()}}
                    >
                    <svg className="text-gray-200 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
                <br/>
                <table className="min-w-max w-full table-auto">
                    <thead className="text-gray-200 uppercase text-sm leading-normal dark:bg-gray-800 border-b-2 border-gray-300">
                        <tr>
                            <th className="py-3 px-6 text-center" rowSpan={2}>No</th>
                            <th className="py-3 px-6 text-center" rowSpan={2}>Kode Trx</th>
                            <th className="py-3 px-6 text-center" rowSpan={2}>Nama</th>
                            <th className="py-3 px-6 text-center" colSpan={3}>Akun Bank</th>
                            <th className="py-3 px-6 text-center" rowSpan={2}>Jumlah</th>
                            <th className="py-3 px-6 text-center" rowSpan={2}>Status</th>
                            <th className="py-3 px-6 text-center" rowSpan={2}>Tanggal</th>
                        </tr>
                        <tr>
                            <th className="py-3 px-6 text-center">Nama Bank</th>
                            <th className="py-3 px-6 text-center">Atas Nama</th>
                            <th className="py-3 px-6 text-center">No.Rekening</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-200 uppercase text-sm leading-normal dark:bg-gray-800 font-bold">
                        {
                            arrDatum?.length>0?arrDatum.map((item:iDeposit,i:number)=>{
                                return (
                                    <tr key={i}>
                                        <td className="py-3 px-6 text-center">{i+1 + (1 * ((arrData===undefined?0:arrData.current_page)-1))}</td>
                                        <td className="py-3 px-6 text-center">{item.kd_trx}</td>
                                        <td className="py-3 px-6 text-center">{item.fullname}</td>
                                        <td className="py-3 px-6 text-center">{item.bank_name}</td>
                                        <td className="py-3 px-6 text-center">{item.acc_name}</td>
                                        <td className="py-3 px-6 text-center">{item.acc_no}</td>
                                        <td className="py-3 px-6 text-right text-red-600">{Helper.numFormat(item.amount)}</td>
                                        <td className="py-3 px-6 text-center">{item.status}</td>
                                        <td className="py-3 px-6 text-center">{moment(item.created_at).format('YYYY-MM-DD')}</td>
                                    </tr>

                                )
                            }):"tidak ada data."

                        }
                    </tbody>
                    
                </table>
                <br/>
                <Pagination
                    totalResults={arrData===undefined?0:arrData.total}
                    resultsPerPage={arrData===undefined?0:arrData.per_page}
                    onChange={(val) => {handlePage(val)}}
                    label="Page navigation"
                />
            </div>
        </div>
    </Layout>
    );
}
export async function getServerSideProps(ctx:NextPageContext) {
    const cookies = nookies.get(ctx)
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

    return { 
        props:{}
    }
}

export default ReportDeposit;
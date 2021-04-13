import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { Card, CardBody, Button } from '@windmill/react-ui'
import { useRouter } from 'next/router'

import Api from 'lib/httpService'
import Helper from 'lib/helper';
import CardBank from 'components/payment/CardBank';

interface iInvoice{
    kode:string;
    datum:iPayment;
}

const Invoice: React.FC<iInvoice> =({kode,datum})=> {
  const router = useRouter()

  return (
    <Layout title={`Invoice`}>
        <div className="container mt-6 lg:px-6 md:px-3">
            <div className="flex justify-between">
            <h2 className="mt-6 text-2xl align-middle	 font-semibold text-gray-700 dark:text-gray-200">
                #{kode}
            </h2>
            </div>
        </div>
        <div className="h-auto mt-8 w-full flex flex-col lg:m-w-96 justify-center items-center mb-20">
            <div className="bg-white dark:bg-gray-700 shadow-md  overflow-hidden  mx-24 w-2/3">
                <div className="py-4 px-8 mt-3 text-gray-700 dark:text-gray-200 flex flex-col items-center justify-items-center">
                    <div className="p-3 text-center">
                      <h3 className="text-lg">Silahkan transfer sebesar:</h3>
                      <Card colored className="bg-old-gold mt-6">
                        <CardBody>
                          <p className="text-white text-xl">
                            {datum.grand_total}
                          </p>
                        </CardBody>
                      </Card>
                      <hr className="mt-6 mb-3"/>

                      <h3 className="mt-3 mb-4 text-lg">Pembayaran dapat dilakukan ke rekening berikut :</h3>
                      <ul>
                       <CardBank 
                          selected={false}
                          id={'saldo'}
                          title={datum.bank_name}
                          acc_name={datum.acc_name}
                          acc_no={datum.acc_no}
                          logo={datum.logo}
                          handleClick={()=>{}}
                        />

                      </ul>
                      <hr className="mt-6 mb-3"/>
                      <h3>
                        Anda dapat melakukan transfer menggunakan ATM, Mobile Banking atau SMS Banking dengan memasukan kode bank {datum.tf_code} di depan No.Rekening atas nama {datum.acc_name}
                      </h3>
                      <hr className="mt-6 mb-3"/>

                      <p>
                        Pastikan anda transfer sebelum tanggal {datum.limit_tf} atau transaksi anda otomatis dibatalkan oleh sistem. 
                        <br/>
                        Proses verifikasi akan memakan waktu 10-15 menit. Untuk mempercepat proses verifikasi silahkan sertakan bukti transfer.
                      </p>
                    </div>
                    <div className="py-4 mt-8 text-right">
                        <Button className="bg-base-blue hover:bg-base-blue-600 w-full sm:w-auto mr-6">Upload Bukti Transfer</Button>
                        <Button className="bg-base-red hover:bg-base-red-600 w-full sm:w-auto mr-6">Batalkan Transaksi</Button>
                        <Button className="bg-old-gold hover:bg-old-gold-600 w-full sm:w-auto" onClick={()=>{router.push('/')}}>Kembali</Button>
                    </div>
                </div>
            </div>


            
        </div>

    </Layout>
);
}

interface iPayment{
  kd_trx: string;
  kd_unique: number;
  grand_total: string;
  bank_name: string;
  acc_name: string;
  acc_no: string;
  tf_code: string;
  payment_slip: string;
  logo: string;
  limit_tf: string;
}

export async function getServerSideProps(ctx:NextPageContext) {
    // Parse
    const cookies = nookies.get(ctx)
    const { kode } = ctx.query;
    const decodeKode = Helper.decode(kode as string);

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

    let datum=[];
    try {
        const getDetail = await Api.get(Api.apiUrl+"transaction/get_payment/"+kode)
        if(getDetail.status===200){
            datum=getDetail.data.result;
        }else{
            datum=[];
        }
    } catch (err) {
      console.log(err.response.data)
    }



    return { 
        props:{
            kode:decodeKode,
            datum
        }
    }
}

export default Invoice;
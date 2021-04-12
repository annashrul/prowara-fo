import React,{useEffect, useState} from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'


import Api from 'lib/httpService'
import {iPaket, iOpt, iBankPt} from 'lib/interface'
import Helper from 'lib/helper'
import Nominal from 'components/deposit/nominal';
import ListBank from 'components/deposit/ListBank';
import Preview from 'components/deposit/preview';

interface iInvoice{
    category: Array<iOpt>;
    options: Array<iOpt>;
    total_tiket:number;
    dataBank?:Array<iBankPt>;
}

const Invoice: React.FC<iInvoice> =({dataBank})=> {
    const { addToast } = useToasts();
    const router = useRouter();
    const min_nominal=50000;
    const [step,setStep]=useState(1);
    const [nominal,setNominal]=useState(0);
    const [bank,setBank]=useState<iBankPt>();

    const doNominal=(nominal:number)=>{
        if(nominal===0) addToast("Nominal tidak boleh kosong!", {appearance: 'warning',autoDismiss: true});
        else if(nominal<min_nominal) addToast(`Minimal deposit adalah ${Helper.numFormat(`${min_nominal}`)}`, {appearance: 'warning',autoDismiss: true});
        else{
            setNominal(nominal)
            setStep(step+1);
        }
    }

    const getBank=(datum:iBankPt)=>{
        setBank(datum)
        setStep(step+1);
    }

    const doStep=(step:number)=>{
        setStep(step);
    }



    return (
        <Layout title="Deposit Poin">
            <div className="container mt-6 lg:px-6 md:px-3">
                <div className="flex justify-between">
                    <h2 className="mt-6 text-2xl align-middle	 font-semibold text-gray-700 dark:text-gray-200">
                        Deposit Poin
                    </h2>
                </div>
            </div>
            <div className="mx-4 p-4 mt-4">
                <div className="flex items-center">
                    <div className="flex items-center relative">
                        <div className={"rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-old-gold-600 "+(step===1?"bg-old-gold-600 text-white":"text-old-gold-600 ")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" >
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-old-gold-600">Nominal</div>
                    </div>
                    {
                        step>1?<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-old-gold-600" />:<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
                    }
                    <div className="flex items-center relative">
                        <div className={"rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-old-gold-600 "+(step===2?"bg-old-gold-600 text-white":"text-old-gold-600 ")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" >
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-old-gold-600">Nominal</div>
                    </div>
                    {
                        step===3?<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-old-gold-600" />:<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
                    }
                    <div className="flex items-center relative">
                        <div className={"rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-old-gold-600 "+(step===3?"bg-old-gold-600 text-white":"text-old-gold-600 ")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-database ">
                            <ellipse cx={12} cy={5} rx={9} ry={3} />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-old-gold-600">Nominal</div>
                    </div>
                </div>
            </div>
            {
                step===1?(
                    <Nominal
                        handleClick={(nominal)=>doNominal(nominal)}
                    />
                    
                ):step===2?(
                    <ListBank dataBank={(dataBank as Array<iBankPt>)} handleClick={(datum:iBankPt)=>getBank(datum)} goBack={(val:number)=>doStep(val)}/>
                ):(
                    <Preview
                        bank={bank?.bank_name}
                        atas_nama={bank?.acc_name}
                        nominal={`${nominal}`}
                        admin="0"
                        total={`${nominal*10000}`}
                        goBack={(val:number)=>doStep(val)}
                    />
                )
            }

            

        </Layout>
    );
}

export async function getServerSideProps(ctx:NextPageContext) {
    // Parse
    const cookies = nookies.get(ctx)

    if(!cookies._prowara){
        return {
        redirect: {
            destination: '/auth/login',
            permanent: false,
        },
        }
    }

    // manipulate PAKET
    let kate=[];
    let total_tiket=0;
    const options: iOpt[] =[];
    try {
        const getKategori = await Api.get(Api.apiUrl+"category/membership")
        if(getKategori.status===200){
            kate=getKategori.data.result.data;
            total_tiket=getKategori.data.result.total_tiket;
        }else{
            kate=[];
        }
        kate.map((item: iPaket)=>{
            return options.push({
                value: item.id,
                label: item.title
            })
        })
    } catch (err) {}

    // END PAKET

    // GET BANK DATA
    let dataBank=[];
    try {
        const getBank = await Api.get(Api.apiUrl+"bank?perpage=20")

        if(getBank.status===200){
        dataBank=getBank.data.result.data;
        }else{
        dataBank=[];
        }
    } catch (err) {}

    return { 
        props:{
            kategori:kate,
            total_tiket,
            options,
            dataBank
        }
    }
}

export default Invoice;

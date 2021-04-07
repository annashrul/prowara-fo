import React, {useState} from 'react';
import { NextPageContext } from 'next'
import nookies from 'nookies'
import Select from 'react-select'
import { Card, CardBody } from '@windmill/react-ui'
import atob from 'atob';

import Layout from 'Layouts'
import Api from 'lib/httpService';
import {iUser,iPaket,iOpt} from 'lib/interface';
import Helper from 'lib/helper';
import Button from 'components/Common/Button'

interface iCards {
  dataPaket: Array<iPaket>;
  options: Array<iOpt>;
  userData: iUser;
}
const TambahMitra: React.FC<iCards> = ({dataPaket,options,userData}) => {
  console.log(userData)
  const [paket,setPaket]= useState("");
  const [sponsor,setSponsor]= useState("other");
  const [datumPaket,setDatumPaket]= useState<iPaket>();
  console.log(sponsor);
  const handlePaket=(opt:string)=>{
    setPaket(opt);
    for (var i=0; i < dataPaket.length; i++) {
        if (dataPaket[i].id === opt) {
            setDatumPaket(dataPaket[i]);
        }
    }
  }

  return (
    <Layout title="Dashboard">
      <div className="container mt-6 px-2 lg:px-7 mx-auto grid mb-20">
        <div className="flex justify-between">
          <div>
            <h2 className="mt-6 text-2xl align-middle	 font-semibold text-gray-700 dark:text-gray-200">
              Tambah Mitra
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-between mt-6 w-full p-2 lg:rounded-full md:rounded-full bg-white dark:bg-gray-700 dark:hover:bg-gray-800 border border-gray-700	 rounded-lg">
              <div className="lg:flex md:flex items-center">
                <div className="flex flex-col px-3">
                  <div className="text-xs leading-3 text-gray-700 dark:text-gray-300 w-full">Tiket Anda :</div>
                  <div className="text-sm leading-3 text-center text-gray-700 dark:text-gray-300 mt-2 font-bold w-full">100</div>

                </div>
              </div>
            </div>
          </div>
        </div>
          <Card className="w-full mt-8 min-h-0 h-auto">
            <CardBody>
              <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Pilih Paket
                  </span>
                  <Select
                  classNamePrefix="text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-white dark:hover:bg-gray-600 "
                  className=""
                  placeholder="Pilih paket"
                  value={options.find(op => {return op.value === paket})}
                  onChange={option => handlePaket(((option as iOpt)).value)}
                  options={options} />
                </label>
                {/* card paket */}
               
                <div className={datumPaket!==undefined?"flex lg:w-1/2 sm:w-full content-center	self-center m-auto items-center justify-items-center lg:p-4 p-1 mt-4 rounde-lg":"hidden"}>
                
                  <div className="flex items-start  w-full p-2 lg:rounded-full md:rounded-full bg-white dark:bg-gray-700 dark:hover:bg-gray-800 border border-gray-700	 rounded-lg">
                    <div className="py-1 px-2 text-sm lg:h-auto text-gray-700 dark:text-gray-100  focus:outline-none w-1/3 lg:w-1/6">
                        <img src="/logo.png" className="w-full "/>
                      </div>
                      <div className="py-1 px-2  text-sm text-gray-700 dark:text-gray-100 focus:outline-none mt-3 lg:mt-4  w-2/3 lg:w-5/6">
                        <div className="text-sm leading-3 text-gray-700 dark:text-gray-400 font-bold w-full">{datumPaket?.title}</div>
                        <div className="text-gray-600 mt-3 text-xs dark:text-gray-300  w-full">
                          Tiket Dibutuhkan : {datumPaket?.pin_required}, Harga : {Helper.formatRupiah((datumPaket?.price as string))} 
                        </div>
                      </div>
                  </div>
                </div>
                <div className=" mt-4 flex w-full content-center	self-center m-auto items-center justify-items-center ">
                  <button
                      type="button"
                      className={
                        sponsor==='other'?
                        "py-1 px-2 text-sm  bg-old-gold-500 text-gray-700 dark:text-gray-100  border-4 border-old-gold-500  focus:outline-none w-1/3 lg:w-1/2"
                        :
                        "py-1 px-2 text-sm text-gray-700 dark:text-gray-100  border-4 border-old-gold-500 focus:outline-none  w-1/3 lg:w-1/2"
                      }
                      onClick={(event)=>{
                        event.preventDefault();
                        setSponsor('other');
                      }}
                    >
                    Sponsor
                  </button>
                  <button
                    type="button"
                    className={
                        sponsor!=='other'?
                        "py-1 px-2 text-sm  bg-old-gold-500 text-gray-700 dark:text-gray-100  border-4 border-old-gold-500  focus:outline-none w-2/3 lg:w-1/2"
                        :
                        "py-1 px-2 text-sm text-gray-700 dark:text-gray-100  border-4 border-old-gold-500 focus:outline-none  w-2/3 lg:w-1/2"
                      }
                    onClick={(event)=>{
                        event.preventDefault();
                        setSponsor('me');
                      }}
                  >
                    Saya Sebagai Sponsor
                  </button>
                </div>

              <div className={sponsor==='other'?"mt-4 flex":"hidden"}>
                <input 
                className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                placeholder="User ID sponsor" />
                <button className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r">
                  <svg className="text-gray-200 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Sponsor</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  value={userData?.fullname}
                  readOnly />
                </label>
                
                {/*****  
                  * DATA DIRI
                */}

                <h6 className="mt-5 border-b border-gray-700 pb-1 text-bold text-gray-700 dark:text-gray-400">
                    Data Diri
                </h6>

                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Nama Lengkap</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>

                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Nomor Telepon</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>

                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">No. KTP</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>


                <h6 className="mt-5 border-b border-gray-700 pb-1 text-bold text-gray-700 dark:text-gray-400">
                    Data Rekening
                </h6>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Bank</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Nama Pemilik</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">No. Rekening</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>

                <label className="inline-flex items-center mt-8">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
                  <span className="ml-2 text-gray-700 dark:text-gray-400 text-xs">
                    Saya Setuju Dengan Persyaratan dan Kondisi Pendaftaran.<br/>
                    <button className='text-old-gold'>Terms & Conditions</button>
                  </span>
                </label>

                <div className="text-right mr-5">
                  <Button
                    style="mt-5 text-gray-700 dark:text-gray-200 px-5 py-3 text-sm"
                    title="Daftarkan Mitra!"
                    color="old-gold"
                    size="sm"
                  />

                  <Button
                    style="mt-5 text-gray-700 dark:text-gray-200 px-5 py-3 text-sm bg-maroon-700 ml-3"
                    title="Reset."
                    color="maroon"
                    size="sm"
                  />

                </div>
              </div>
            </CardBody>
          </Card>
       
      </div>
    </Layout>
);
}



export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  const userData = JSON.parse(atob(cookies.__uid));
  console.log(userData);
  if(!cookies._prowara){
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  const getPaket = await Api.get(Api.apiUrl+"paket?perpage=100")
  let paket=[];
  if(getPaket.status===200){
    paket=getPaket.data.result.data;
  }else{
    paket=[];
  }
  const options: { value: string, label: string }[] =[];
  paket.map((item: iPaket)=>{
    return options.push({
      value: item.id,
      label: item.title
    })
  })
  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { 
    props:{
      cookies,
      options,
      dataPaket:paket,
      base_api:process.env.API===undefined?'':process.env.API,
      otpLength:4,
      userData
    }
  }
}

export default TambahMitra;
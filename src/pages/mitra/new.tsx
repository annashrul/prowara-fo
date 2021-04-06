import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { Card, CardBody } from '@windmill/react-ui'
import Api from 'lib/httpService';
import Select from 'react-select'

interface iCards {
  dataPaket: Array<iPaket>;
  options: Array<iOpt>;
}
const TambahMitra: React.FC<iCards> = ({ options}) => {
  console.log(options);
  // const router = useRouter();
  // useEffect(() => {
  //   router.push('/extra-components/accordion');
  // }),
  //   [];
  // const handleClick = ()=>{console.log('CLICKED')}
  return (
    <Layout title="Dashboard">
      <div className="container mt-6 px-6 mx-auto grid mb-20">
        <h2 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Tambah Mitra
        </h2>
          <Card className="w-full mt-8 min-h-0 overflow-y-auto" style={{maxHeight:'600px'}}>
            <CardBody>
{/* fullname
mobile_no
nik
sponsor
signup_source
bank
id_paket
id_bank_destination */}
              <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Pilih Paket
                  </span>
                  <Select
                  classNamePrefix="text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-white dark:hover:bg-gray-600 "
                  className=""
                  options={options} />
                  {/* <select 
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  >
                    {
                      dataPaket.map((item: iPaket)=>{
                        return <option value={item.id}>{item.title}</option>
                      })
                    } */}
                  {/* </select> */}
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Nama Lengkap</span>
                  <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" 
                  placeholder="Jane Doe" />
                </label>
                
              
              </div>

            </CardBody>
          </Card>
       
      </div>
    </Layout>
);
}

interface iPaket{
  id:string,
  title:string,
  price:number,
  category:string,
  gambar:string
}


interface iOpt{
  value:string,
  label:string,
}

export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  console.log(cookies);
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
      otpLength:4
    }
  }
}

export default TambahMitra;
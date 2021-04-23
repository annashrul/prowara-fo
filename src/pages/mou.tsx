import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import Api from 'lib/httpService';
import Helper from 'lib/helper';

interface iDashboard{
  datum:string;
}

const Dashboard: React.FC<iDashboard> = ({datum}) => {
  return (
      <Layout title="MoU Prowara">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                MoU Prowara
            </h2>
            <iframe src={datum} width="100%" height="800px"></iframe>

        </div>
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
  }else{
    Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
  }

    // GET BANK DATA
  let datum=[];
  try {
    const getData = await Api.get(Api.apiUrl+"site/mou")
    if(getData.status===200){
      datum=getData.data.result;
    }else{
      datum=[];
    }
  } catch (err) {}


  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props:{
      datum
    }
  }
}

export default Dashboard
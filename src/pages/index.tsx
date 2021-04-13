import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'

import Berita from 'components/Dashboard/Berita'
import Widget from 'components/Dashboard/Card';
import Slot from 'components/Dashboard/Slot';
import Api from 'lib/httpService';
import Helper from 'lib/helper'

interface iDashboard{
  widget:iWidget;
}

const Dashboard: React.FC<iDashboard> = ({widget}) => {
  return (
      <Layout title="Dashboard">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
          {/* CARD SECTION */}
          <Widget
            c1={`${Helper.numFormat(`${widget.saldo}`)}`}
            c2={widget.total_pin + " Tiket"}
            c3={`${widget.paket_berjalan}`}
            c4={`${widget.sponsor}`}
          />
        
          {/* SLOT SECTION */}
          <Slot/>

          {/* BOTTOM SECTION */}
          <Berita/>
        </div>
      </Layout>
  );
}

interface iWidget{
  total_pin: number;
  saldo: number;
  paket_berjalan: number;
  sponsor: number;
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
    const getData = await Api.get(Api.apiUrl+"site/memberarea")

    if(getData.status===200){
      datum=getData.data.result;
    }else{
      datum=[];
    }
  } catch (err) {}


  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props:{
      cookies,
      widget:datum
    }
  }
}

export default Dashboard
import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'

import Helper from 'lib/helper';

interface iInvoice{
    kode:string
}

const Invoice: React.FC<iInvoice> =({kode})=> {
    console.log(kode);
  return (
    <Layout title="Dashboard">
      <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          {kode}
        </h2>
      </div>
    </Layout>
);
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
    }

    // Destroy
    // nookies.destroy(ctx, 'cookieName')

    return { 
        props:{
            kode:decodeKode
        }
    }
}

export default Invoice;
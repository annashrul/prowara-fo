import React, { useState, useEffect} from "react";
import { useToasts } from 'react-toast-notifications'
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import {iTransaksi,iPagin} from 'lib/interface';
import { Pagination } from '@windmill/react-ui'
import NProgress from 'nprogress'; //nprogress module
import moment from 'moment'
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

interface iOrderTiket {}

const OrderTiket: React.FC<iOrderTiket> = () =>{
    

    return (
        <Layout title="Report Investment">
            <div className="container mt-6 px-2 lg:px-7 mx-auto grid mb-20">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Order Tiket
                        </h2>
                    </div>
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

export default OrderTiket;
import React from 'react';
import Layout from 'Layouts'
import Widget from 'components/Dashboard/Card';
import Slot from 'components/Dashboard/Slot';
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { Card, CardBody } from '@windmill/react-ui'

export default function Index() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push('/extra-components/accordion');
  // }),
  //   [];
  // const handleClick = ()=>{console.log('CLICKED')}
  return (
    <Layout title="Dashboard">
      <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>
        {/* CARD SECTION */}
        <Widget
          c1='Rp 500.000'
          c2='Rp 10.000.000'
          c3='Rp 50.000.000'
          c4='1'
        />
       
        {/* SLOT SECTION */}
        <Slot/>
        <Card className="md:w-1/2 sm:w-full mt-8 min-h-0 overflow-y-auto" style={{maxHeight:'600px'}}>
          <CardBody>
              <p className="mb-4 font-semibold text-gray-700 dark:text-gray-200">Berita Terbaru</p>
              <div className="flex ">
                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                  <a className="flex items-center flex-wrap">
                    <img alt="testimonial" className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded" src="https://dummyimage.com/302x302/94a3b8/ffffff" /> <span className="flex flex-col flex-grow pl-4">
                      <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">Software developer </span>
                      <span className="text-xs text-gray-500 uppercase font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex ">
                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                  <a className="flex items-center flex-wrap">
                    <img alt="testimonial" className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded" src="https://dummyimage.com/302x302/94a3b8/ffffff" /> <span className="flex flex-col flex-grow pl-4">
                      <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">Software developer </span>
                      <span className="text-xs text-gray-500 uppercase font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex ">
                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                  <a className="flex items-center flex-wrap">
                    <img alt="testimonial" className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded" src="https://dummyimage.com/302x302/94a3b8/ffffff" /> <span className="flex flex-col flex-grow pl-4">
                      <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">Software developer </span>
                      <span className="text-xs text-gray-500 uppercase font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex ">
                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                  <a className="flex items-center flex-wrap">
                    <img alt="testimonial" className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded" src="https://dummyimage.com/302x302/94a3b8/ffffff" /> <span className="flex flex-col flex-grow pl-4">
                      <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">Software developer </span>
                      <span className="text-xs text-gray-500 uppercase font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex ">
                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                  <a className="flex items-center flex-wrap">
                    <img alt="testimonial" className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded" src="https://dummyimage.com/302x302/94a3b8/ffffff" /> <span className="flex flex-col flex-grow pl-4">
                      <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">Software developer </span>
                      <span className="text-xs text-gray-500 uppercase font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
                    </span>
                  </a>
                </div>
              </div>
              <p className="flex items-center justify-center">
                <button className="text-xs underline text-blue-700 dark:text-blue-200">Lihat Selengkapnya</button>
              </p>
          </CardBody>
        </Card>
      </div>
    </Layout>
);
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

  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props:{
      cookies,
      apiUrl:process.env.API===undefined?'':process.env.API,
      otpLength:4
    }
  }
}
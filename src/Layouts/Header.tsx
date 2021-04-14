import React from 'react';
import nookies from 'nookies'
import { NextPageContext } from 'next'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import {iWidget} from 'lib/interface';

interface HeaderProps {
  toggleSidebar: () => void;
  dataWidget:iWidget;
}

const Header: React.FC<HeaderProps> = ({toggleSidebar,dataWidget}) => {
  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Mobile hamburger */}
        <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" onClick={toggleSidebar} aria-label="Menu">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
            </div>
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Theme toggler */}
          <li className="flex">
            <button className="rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Toggle color mode">
              <template x-if="!dark" />
              <template x-if="dark" />
            </button>
          </li>
          <li className="relative">
            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100">Pin : {dataWidget===undefined?10:dataWidget.total_pin}</span>
            <template x-if="isProfileMenuOpen" />
          </li>
          {/* Notifications menu */}
          <li className="relative">
            <button className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Notifications" aria-haspopup="true">
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {/* Notification badge */}
              <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800" />
            </button>
            <template x-if="isNotificationsMenuOpen" />
          </li>
          {/* Profile menu */}
          <li className="relative">
            <button className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none" aria-label="Account" aria-haspopup="true">
              <img className="object-cover w-8 h-8 rounded-full" src="/logo.png" alt="" aria-hidden="true" />
            </button>
            <template x-if="isProfileMenuOpen" />
          </li>
        </ul>
      </div>
    </header>

  );
};

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
  let dataWidget={};
  try {
      const getData = await Api.get(Api.apiUrl+"site/memberarea")
      dataWidget=getData.data.result;
      console.log("DATA",dataWidget);

  } catch (err) {
      console.log("CONSOLE",err);
  }


  return { 
      props:{dataWidget}
  }
}

export default Header;

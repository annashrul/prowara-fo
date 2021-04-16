import React, { useEffect, useState } from 'react';
import 'react-intl-tel-input/dist/main.css';
import atob from 'atob';
import Layout from 'Layouts';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import nookies from 'nookies';
import { NextPageContext } from 'next';
// import ProfileCard from "components/genealogy/ProfileCard";
// import profiles from "./data.json";
// import { arrayToTree } from "performant-array-to-tree";
// import { useToasts } from "react-toast-notifications";
import { handleGet } from 'lib/handleAction';
// import Skeleton from "components/Common/Skeleton";
import { iUser } from 'lib/interface';
// import httpService from "lib/httpService";
import moment from 'moment';
// import { useToasts } from 'react-toast-notifications';
import helper from 'lib/helper';
interface iIndexProfile {
  // profiles: Array<iProfiles>;
  userData: iUser;
}

const Index: React.FC<iIndexProfile> = ({ userData }) => {
  // const [loading, setLoading] = useState(true);

  // const [datumNetwork,setDatumNetwork]= useState<Array<iNetwork>>([]);
  const [memberArea, setMemberArea] = useState({ total_pin: '', saldo: '', modal: '', sponsor: '' });
  useEffect(() => {
    loadMemberArea();
    // loadNetwork(`isfirst=true`,`UFc1NzExODY4ODI1`);
  }, []);

  // const loadNetwork = async (val: string, id:string) => {
  //     setLoading(true)
  //     let url = Api.apiClient+`member/network/${id}`;
  //     if(val!==null){
  //         url+=`?${val}`;
  //     }
  //     await handleGet(url,(datum)=>{
  //         setDatumNetwork(datum);
  //         setLoading(false);
  //     })

  // }
  const loadMemberArea = async () => {
    // setLoading(true);
    let url = Api.apiClient + `site/memberarea`;
    await handleGet(url, (datum) => {
      setMemberArea(datum);
      // setLoading(false);
    });
  };
  // const { addToast } = useToasts();
  // const doMore = async (val:string)=>{
  //   setLoading(true)
  //   let url = Api.apiClient+`member/network/${btoa(val)}`;
  //   await handleGet(url,(datum)=>{
  //     if(datum.length>0){
  //       setDatumNetwork(datumNetwork.concat(datum));
  //       setLoading(false);
  //     } else {
  //       addToast("Jaringan untuk "+val+" tidak ada!", {appearance: 'warning',autoDismiss: true});
  //       setLoading(false);
  //     }
  //   })
  //   // console.log("datumNetwork push",datumNetwork);
  // }
  console.log(userData);
  return (
    <Layout title="Profile">
      <div className="md:flex no-wrap md:-mx-2 my-8">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 p-3 border-t-4 border-old-gold-400 rounded-b-lg">
            <div className="image overflow-hidden">
              <img className="h-auto w-full mx-auto" src={userData.foto} />
            </div>
            <h1 className="text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 my-1">{userData.fullname}</h1>
            <h3 className="text-gray-600 dark:text-gray-400 font-lg text-semibold leading-6">{userData.referral}</h3>

            <ul className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-lg">
              <li className="flex items-center py-3">
                <span>Status</span>
                {userData.status === 1 ? (
                  <span className="ml-auto">
                    <span className="bg-old-gold-500 py-1 px-2 rounded text-white text-sm">Active</span>
                  </span>
                ) : (
                  <span className="ml-auto">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Non-Active</span>
                  </span>
                )}
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">{moment(userData.created_at).format('LL')}</span>
              </li>
            </ul>
          </div>
          {/* End of profile card */}
          <div className="my-4" />
        </div>
        {/* Right Side */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          {/* Profile tab */}
          {/* About Section */}
          <div
            className="rounded-t-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased h-36 bg-fixed"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")',
              backgroundRepeat: 'no-repat',
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
          ></div>

          <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg -mt-6">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8">
              <span className="text-old-gold-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Membership</span>
            </div>
            <div className="text-gray-700 dark:text-gray-200">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2">Total PIN</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">{memberArea.total_pin} PIN</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2">Saldo</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">
                    {helper.rupiahFormat(memberArea.saldo)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2">Modal</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">{memberArea.modal}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2">Sponsor</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">{memberArea.sponsor}</div>
                </div>
              </div>
            </div>
          </div>
          {/* End of about section */}
          <div className="my-4" />
          {/* Experience and education */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg hidden">
            <div className="grid grid-cols-2">
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                  <span className="text-old-gold-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Experience</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-old-gold-600 dark:text-gray-200">Owner at Her Company Inc.</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-old-gold-600">Owner at Her Company Inc.</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-old-gold-600">Owner at Her Company Inc.</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-old-gold-600">Owner at Her Company Inc.</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                  <span className="text-old-gold-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Education</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-old-gold-600">Masters Degree in Oxford</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-old-gold-600">Bachelors Deold-gold in LPU</div>
                    <div className="text-grey-500 dark:text-gray-200 text-xs">March 2020 - Now</div>
                  </li>
                </ul>
              </div>
            </div>
            {/* End of Experience and education grid */}
          </div>
          {/* End of profile tab */}
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = nookies.get(ctx);
  const userData = JSON.parse(atob(cookies.__uid));
  if (!cookies._prowara) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  } else {
    Api.axios.defaults.headers.common['Authorization'] = Helper.decode(cookies._prowara);
  }

  return {
    props: {
      userData,
    },
  };
}

export default Index;

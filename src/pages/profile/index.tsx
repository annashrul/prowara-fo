import React, {  useEffect, useState } from 'react';
import 'react-intl-tel-input/dist/main.css';
import Layout from 'Layouts';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import { handleGet } from 'lib/handleAction';
import { iUser } from 'lib/interface';
import moment from 'moment';
import helper from 'lib/helper';
// import { useToasts } from 'react-toast-notifications';
// import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageContext } from 'next';
import nookies from 'nookies';
import atob from 'atob';
// import Cropper from 'react-easy-crop';
// import getCroppedImg from 'lib/getCropped';
interface iIndexProfile {
  userData: iUser;
}
// type FormValues = {
//   full_name: string;
//   pin: string;
//   picture: string;
// };
const Index: React.FC<iIndexProfile> = ({ userData }) => {
  // const { addToast } = useToasts();
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const { register, handleSubmit } = useForm<FormValues>();
  const [memberArea, setMemberArea] = useState({ total_pin: '', saldo: '', modal: '', sponsor: '' });
  // const [memberFoto, setMemberFoto] = useState('');
  // const [croppedFoto, setCroppedFoto] = useState('');
  useEffect(() => {
    loadMemberArea();
  }, []);

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    // var that = this;
    // try {
    //   let res = '';
    //   const croppedImage = getCroppedImg(memberFoto, croppedAreaPixels);
    //   Promise.resolve(croppedImage).then(function (value) {
    //     let getRes = '';

    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = () => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         getRes = String(reader.result);
    //         // that.setState({ cropped: reader.result });
    //         setCroppedFoto(getRes);
    //       };
    //       reader.readAsDataURL(xhr.response);
    //     };
    //     xhr.open('GET', String(value));
    //     xhr.responseType = 'blob';
    //     xhr.send();
    //     res = getRes;
    //   });
    //   // setCroppedImage(croppedImage)

    //   // this.setState({ cropped: res });
    // } catch (e) {
    //   console.error(e);
    // }
  // }, []);

  const loadMemberArea = async () => {
    let url = Api.apiClient + `site/memberarea`;
    await handleGet(url, (datum) => {
      setMemberArea(datum);
    });
  };
  // const onSubmit: SubmitHandler<FormValues> = (data) => {
  //   const datum = {
  //     full_name: data.full_name,
  //     pin: data.pin,
  //     picture: data.picture,
  //   };
  //   Helper.removeCookie('_regist');
  //   Helper.setCookie('_regist', JSON.stringify(datum));
  //   // router.push('/mitra/new/payment');
  // };
  // const handleFoto = (event: any) => {
  //   //  let me = this;
  //   let file = event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     //me.modelvalue = reader.result;
  //     console.log(reader.result);
  //     setMemberFoto(String(reader.result));
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // };
  return (
    <Layout title="Profile">
      <div className="md:flex no-wrap md:-mx-2 my-8">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 p-3 border-t-4 border-old-gold-400 rounded-b-lg">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src={""}
                onError={(e) => {
                  onerror = null;
                  e.currentTarget.src = 'https://dummyimage.com/302x302/94a3b8/ffffff';
                }}
              />
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
                  <div className="px-4 py-2">Total Tiket</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">{memberArea.total_pin} Tiket</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2">Saldo</div>
                  <div className="px-4 py-2 font-semibold dark:text-old-gold-500">
                    {helper.numFormat(`${memberArea.saldo}`)}
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
          {/* Edit Profile 
          <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Edit Profile</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block my-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Foto</span>
                    <input
                      type="file"
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="fullname"
                      onChange={(e) => handleFoto(e)}
                      ref={register({ required: true, maxLength: 80 })}
                      placeholder="Nama Lengkap Mitra"
                    />
                  </label>
                  <div className="flex w-full h-52 relative bg-white">
                    <Cropper
                      image={memberFoto}
                      crop={crop}
                      zoom={zoom}
                      aspect={1 / 1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Nama Lengkap</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="fullname"
                      ref={register({ required: true, maxLength: 80 })}
                      placeholder="Nama Lengkap Mitra"
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
           End of Edit Profile grid */}
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

import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
// import { useToasts } from 'react-toast-notifications';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import { handlePut } from 'lib/handleAction';
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import Cropper from 'react-easy-crop';
import getCroppedImg from 'lib/getCropped';
import { Point, Area } from 'react-easy-crop/types';

interface iModalProfile {
  open: boolean;
  closeModal: () => void;
  userData: any;
}
type FormValues = {
  full_name: string;
  pin: string;
  //   picture: string;
};
const ModalProfile: React.FC<iModalProfile> = ({ open, closeModal, userData }) => {
  //   const { addToast } = useToasts();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { register, handleSubmit } = useForm<FormValues>();
  const [memberFoto, setMemberFoto] = useState('');
  const [croppedFoto, setCroppedFoto] = useState('');
  useEffect(() => {
    // if (!croppedFoto) return; // this will stop the loop if counter is not even
    // onCropComplete;

    console.log('cropped', String(croppedFoto));
  });
  const onCropComplete = useCallback(async (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
    // console.log(croppedArea, croppedAreaPixels);
    // var that = this;
    // try {
    // let res = '';
    try {
      const croppedImage = getCroppedImg(memberFoto, croppedAreaPixels);
      // setCroppedFoto(croppedImage);
      await croppedImage.then(function (result) {
        setCroppedFoto(result);
        console.log('crop area', result); // "Some User token"
      });
      //   console.log('croppedImage', croppedImage);
      // Promise.resolve(croppedImage).then(function (value) {
      //   setCroppedFoto(String(value));
      //   console.log('cropped', String(value));
      // });
      // setCroppedImage(croppedImage)

      // this.setState({ cropped: res });
      // } catch (e) {
      //   console.error('error', e);
      // }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleModal = () => {
    closeModal();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let datum: any = {
      full_name: data.full_name,
      pin: data.pin,
      picture: croppedFoto,
    };
    // let datum = Object.create({ full_name: '', pin: '', picture: '' });
    // datum['full_name'] = data.full_name;
    // datum['pin'] = data.pin;
    // datum['picture'] = croppedFoto;

    if (datum.full_name === '') {
      delete datum.full_name;
    }
    if (datum.pin === '') {
      delete datum.pin;
    }
    if (datum.picture === '') {
      delete datum.picture;
    }
    await handlePut(Api.apiClient + `member/${userData.id}`, datum, (datum) => {
      console.log(datum);
      Helper.mySwalWithCallback(datum.msg, () => {
        router.push('/profile');
        toggleModal();
      });
    });
    console.log(datum);
    // router.push('/mitra/new/payment');
  };
  const handleFoto = (event: any) => {
    //  let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log('from input', reader.result);
      setMemberFoto(String(reader.result));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <Modal isOpen={open} onClose={toggleModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="w-full items-center justify-items-center p-0">
            {/* <div className="w-full flex flex-col items-center justify-items-center mb-6">
            <img src="/logo.png" className="w-1/4" />
            <h3 className="text-center mt-3">Ubah Profile</h3>
          </div> */}
            {/* Edit Profile */}
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
              <div className="grid grid-cols-1">
                <div>
                  <label className="block my-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Foto</span>
                    <input
                      type="file"
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="full_name"
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
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Nama Lengkap</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="full_name"
                      value={userData.fullname}
                      ref={register({ required: false, maxLength: 80 })}
                      placeholder="Nama Lengkap"
                    />
                  </label>
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">PIN</span>
                    <input
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="pin"
                      type="text"
                      maxLength={6}
                      ref={register({ required: false, maxLength: 6 })}
                      placeholder="6 digit PIN angka"
                    />
                  </label>
                </div>
                {/* <div className="col-span-2">
                  
                </div> */}
              </div>
            </div>
            {/* End of Edit Profile grid */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" layout="outline" onClick={toggleModal}>
            Batal
          </Button>
          <Button className="bg-old-gold hover:bg-old-gold-600 w-full sm:w-auto" type="submit">
            Simpan Perubahan
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ModalProfile;

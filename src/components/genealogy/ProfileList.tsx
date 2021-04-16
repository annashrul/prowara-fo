import { iProfiles } from 'lib/interface';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import ProfileCard from './ProfileCard';
interface iProfileList {
  data: Array<iProfiles>;
}
const ProfileList: React.FC<iProfileList> = ({data = [] }) => {
  const { addToast } = useToasts();
    const doMore = (idData:string)=>{
      // const checkoutData={
      //     qty:qty,
      //     member_pin:pin,
      //     id_bank_destination:bank,
      //     metode_pembayaran:bank==='saldo'?'saldo':'transfer'
      // }
     addToast(idData, {appearance: 'error',autoDismiss: true});
    }
  return (
    <ul className="flex flex-row mt-10 justify-center">
      {/* <PseudoBorder mTop="-mt-10" /> */}
      <div className="-mt-10 border-l-2 absolute h-10 border-gray-400" />
      {data.map((res, idX) => {
        const len = data.length;
        return (
          <li key={idX} className="relative p-6">
            <div
              style={{
                left: idX === 0 ? "50%" : 0,
                right: idX === len - 1 ? "50%" : 0
              }}
              className="border-t-2 absolute h-8 border-gray-400 top-0"
            />
            <div className="relative flex justify-center">
              {/* <PseudoBorder mTop="-mt-6" /> */}
              <div className="-mt-6 border-l-2 absolute h-6 border-gray-400 top-0" />
              <ProfileCard
              key={idX}
              {...res}
              id={res.id}
              name={res.name}
              role={res.role}
              res={[]}
              callBack={(val)=>doMore(val)}
              // {...profile}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default ProfileList;

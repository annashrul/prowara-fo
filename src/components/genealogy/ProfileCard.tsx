import { iProfiles } from 'lib/interface';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import ProfileList from './ProfileList';
interface iProfileCard {
  id: number;
  name: string;
  role: string;
  profiles: Array<iProfiles>;
}
const ProfileCard: React.FC<iProfileCard> = ({ id, name, role, profiles = [] }) => {
  // const [idData,setData]=React.useState('-');
  const { addToast } = useToasts();
  
  const handleMore=(idData:number)=>{
        addToast(idData, {appearance: 'warning',autoDismiss: true});
}
  return (
    <div className="text-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-16">
          <img
            className="block rounded-full m-auto shadow-md"
            alt={name}
            src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
          />
        </div>
        <div className="text-gray-600">
          <p>{name}</p>
          <p>{role}</p>
          {profiles.length <= 0 && 
          <button
            className="inline-flex items-center justify-center w-7 h-7 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
            onClick={(event)=>{event.preventDefault();handleMore(id);}}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </button>
          }
        </div>
      </div>
      {profiles.length > 0 && <ProfileList profiles={profiles} />}
    </div>
  );
};
export default ProfileCard;

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar'
import SEO, { SEOProps } from 'components/SEO';

const LayoutPage: React.FC<SEOProps> = ({children, ...rest }) => {
  const [open,setOpen]=useState(false);
  const [openProfile,setopenProfile]=useState(false);
  const {title}=rest;
  console.log(openProfile);

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`} onClick={()=>setopenProfile(false)}>
      <SEO {...rest} />
      {
        title!=='Login'&& <Sidebar isOpen={open} toggleSidebar={() => setOpen(!open)} />
      }
        <div className="flex flex-col flex-1 w-1/2" style={{zoom:'90%'}}>
          {
            title!=='Login'&& <Header openProfile={openProfile} toggleProfile={(toggle:boolean)=>setopenProfile(!openProfile)} toggleSidebar={() => setOpen(!open)} />
          }
            
            <main className="h-full overflow-y-auto">
              <div className="container grid px-6 mx-auto">{children}</div>
            </main>
        </div>
      </div>
  );
};


// export async function getServerSideProps(ctx:NextPageContext) {
  // const cookies = nookies.get(ctx)
  // if(cookies._prowara){
  //     return {
  //       redirect: {
  //           destination: '/auth/login',
  //           permanent: false,
  //       },
  //     }
  // }else{
  //     Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
  // }
  
//   return { 
//       props:{}
//   }
// }
export default LayoutPage;




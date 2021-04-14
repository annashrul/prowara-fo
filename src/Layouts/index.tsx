import React, { useState,useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar'
import SEO, { SEOProps } from 'components/SEO';



const LayoutPage: React.FC<SEOProps> = ({children, ...rest }) => {
  const [open,setOpen]=useState(false);
  const [pin,setPin]=useState(0);
  const {title}=rest;

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      <SEO {...rest} />
      {
        title!=='Login'&& <Sidebar isOpen={open} toggleSidebar={() => setOpen(!open)} />
      }
        <div className="flex flex-col flex-1 w-1/2" style={{zoom:'90%'}}>
          {
            title!=='Login'&& <Header pin={pin} toggleSidebar={() => setOpen(!open)} />
          }
            
            <main className="h-full overflow-y-auto">
              <div className="container grid px-6 mx-auto">{children}</div>
            </main>
        </div>
      </div>
  );
};


// export async function getServerSideProps(ctx:NextPageContext) {
//   const cookies = nookies.get(ctx)
//   if(!cookies._prowara){
//       return {
//         redirect: {
//             destination: '/auth/login',
//             permanent: false,
//         },
//       }
//   }else{
//       Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
//   }
//   let dataWidget={};
//   try {
//       const getData = await Api.get(Api.apiUrl+"site/memberarea")
//       if(getData.status===200){
//           dataWidget=getData.data.result;
//       }else{
//           dataWidget=[];
//       }
//       console.log("DATA",dataWidget);

//   } catch (err) {
//       console.log("CONSOLE",err);
//   }

  


//   return { 
//       props:{dataWidget,dataBank}
//   }
// }
export default LayoutPage;




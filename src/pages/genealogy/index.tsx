import React, { useState } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import nookies from 'nookies'
import { NextPageContext } from 'next'
import ProfileCard from "components/genealogy/ProfileCard";
import { arrayToTree } from "performant-array-to-tree";
import { useToasts } from "react-toast-notifications";
interface iIndexGenealogy {
  // profiles: Array<iProfiles>;
}



// const treeItems = arrayToTree(JSON.parse(JSON.stringify(array)),{ dataField: null, childrenField: "children"  });
// console.log("treeItems",treeItems);
// console.log("profiles",profiles);

const Index: React.FC<iIndexGenealogy> = () =>{
  let array = 
[
  {id:1 ,parentId : null ,name:'Name 1', role:'ROLE 1'},
  {id:2 ,parentId : 1 ,name:'Name 2', role:'ROLE 2'},
  {id:3 ,parentId : 1 ,name:'Name 3', role:'ROLE 3'},
  {id:8 ,parentId : 1 ,name:'Name 8', role:'ROLE 8'}
]
;
  const [theArrayOfObjects, setTheArrayOfObjects] = useState(array);
  const { addToast } = useToasts();
  const treeData = arrayToTree(theArrayOfObjects,{ dataField: null, childrenField: "children"  });
    const doMore = (val:string)=>{
      console.log(val);
      addToast(val, {appearance: 'warning',autoDismiss: true});
      // array.push({id:parseInt(val,10)+1 ,parentId : parseInt(val,10) ,name:'Name '+val, role:'ROLE '+val});
  
      setTheArrayOfObjects(prevState => [...prevState, {id:parseInt(val,10)+1 ,parentId : parseInt(val,10) ,name:'Name '+val, role:'ROLE '+val}]);
      console.log(theArrayOfObjects);
      console.log("arrayToTree(theArrayOfObjects,{ dataField: null, childrenField: 'children'  })",arrayToTree(theArrayOfObjects,{ dataField: null, childrenField: "children"  }));
    }
    return (
      <Layout title="Genealogy">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Genealogy
          </h2>
          {/* CARD SECTION */}
          {/* component */}
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <div className="items-center justify-center flex">
                {treeData && treeData.map((res, idX) => (
                  <ProfileCard
                    key={idX}
                    {...res}
                    id={parseInt(String(res.id),10)}
                    name={res.name}
                    role={res.role}
                    res={res.children}
                    callBack={(val)=>doMore(val)}
                     />
                ))}
              </div>
            </div>
            {/* <a
              className="text-md underline text-gray-500 hover:text-gray-700 cursor-pointer bottom-0 absolute"
              href="https://codesandbox.io/s/github/ravisankarchinnam/tailwindcss-react-flowchart"
            >
              Next.js version
            </a> */}
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


export default Index;
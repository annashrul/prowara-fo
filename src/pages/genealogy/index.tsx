import React from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import nookies from 'nookies'
import { NextPageContext } from 'next'
import ProfileCard from "components/genealogy/ProfileCard";
import profiles from "./data.json";
interface iIndexGenealogy {
  // profiles: Array<iProfiles>;
}


const Index: React.FC<iIndexGenealogy> = () =>{
    // const { addToast } = useToasts();
    // const [datumInvestment,setDatumInvestment]= useState<Array<iInvestment>>([]);
    // const [arrData,setArrData]= useState({});
    // const [any,setAny]=useState("");
    // useEffect(() => {
    //     console.log("componentDidMount")
    //     handleLoadData("page=1");
    // }, []);

   
    // const handleLoadData = async(val:string)=>{
    //     NProgress.start();
    //     try {
    //         let url = Api.apiClient+`transaction/history/investment`;
    //         if(val!==null){
    //             url+=`?${val}`;
    //         }
    //         const getData=await Api.get(url)
    //         NProgress.done()
    //         if(getData.data.status==='success'){
    //             const datum = getData.data.result;
    //             setDatumInvestment(datum.data);
    //             setArrData({
    //                 current_page:datum.current_page,
    //                 total:datum.total,
    //                 per_page:datum.per_page,
    //                 summary:{
    //                     trx_in:datum.summary.trx_in,
    //                     trx_out:datum.summary.trx_out,
    //                     saldo_awal: datum.summary.saldo_awal
    //                 }
    //             });
    //         }else{
    //             addToast("Kesalahan pada server.", {
    //                 appearance: 'error',
    //                 autoDismiss: true,
    //             })
    //         }
        
    //     } catch (err) {
    //         NProgress.done()
    //         // save token to localStorage
    //         if (err.message === 'Network Error') {
    //             addToast("Tidak dapat tersambung ke server!", {
    //                 appearance: 'error',
    //                 autoDismiss: true,
    //             })
                
    //         }else{
    //             if(err.response.data.msg!==undefined){
    //             addToast(err.response.data.msg, {
    //                 appearance: 'error',
    //                 autoDismiss: true,
    //                 })
    //             }else{
    //             addToast("Kesalahan pada server.", {
    //                 appearance: 'error',
    //                 autoDismiss: true,
    //                 })
    //             }
    
    //         }
    //     }
    // }

    // const handleSearch=()=>{
    //     console.log(any);
    //     handleLoadData(`page=1&q=${btoa(any)}`);
    // }
    // const handlePage=(pagenum:string)=>{
    //     console.log(pagenum);
    //     if(any!==''){
    //         handleLoadData(`page=${pagenum}&q=${btoa(any)}`);
    //     }
    // }

    // let totTrxIn=0;
    // let totTrxOut=0;
    // console.log(arrData);
    return (
      <Layout title="Dashboard">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
          {/* CARD SECTION */}
          {/* component */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl top-0 absolute">Organisation Flow chart</h1>
            <div className="overflow-y-scroll h-screen" style={{width:'90%'}}>
              <div className="items-center justify-center flex">
                {profiles && profiles.map((profile, idX) => (
                  <ProfileCard
                    key={idX}
                    {...profile}
                    id={profile.id}
                    name={profile.name}
                    role={profile.role}
                    profiles={JSON.parse(JSON.stringify(profile.profiles))}
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
import React from 'react';
import {iSlot} from 'lib/interface';
import Helper from 'lib/helper'
import Skeleton from 'components/Common/Skeleton'
import { Badge } from '@windmill/react-ui'
import { useToasts } from 'react-toast-notifications'


interface iCards {
    datum:iSlot;
    isLoading?: boolean;
}
const Cards: React.FC<iCards> = ({datum,isLoading}) => {
    const { addToast } = useToasts();

    const handleToast=()=>addToast("Transaksi akan berjalan sesuai dengan tanggal dimulai.", {appearance: 'warning',autoDismiss: true})
    const load=[];
    for(let i=0;i<4;i++){
        load.push(
            <tr key={i} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                    <Skeleton />
                </td>
                <td className="px-4 py-3 text-xs">
                   <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                    <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                    <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                   <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                <Skeleton />
                </td>
                <td className="px-4 py-3 text-sm">
                <Skeleton />
                </td>
            </tr>
        )
    }
  return (
      <>
      {
          isLoading?load:(
            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <p className="font-semibold">{datum?.title}</p>
                </td>
                <td className="px-4 py-3 text-sm">
                    {Helper.numFormat(datum?.amount)}
                </td>
                <td className="px-4 py-3 text-xs">
                    {datum?.contract} Hari
                </td>
                <td className="px-4 py-3 text-sm">
                    {parseFloat(datum?.amount)*(parseFloat(datum?.daily_earning)/100)} Poin
                </td>
                <td className="px-4 py-3 text-sm">
                    {Helper.formatDate(`${datum?.start_date}`,false)}
                </td>
                <td className="px-4 py-3 text-sm">
                    {datum.status===1?Helper.calculateCountdown(`${datum.start_date}`):"-- Hari -- Jam -- Menit"}
                </td>
                <td className="px-4 py-3 text-sm">
                    {
                        datum.status===1?(
                            <span className="px-2 py-1 font-semibold leading-tight text-base-blue-700 bg-base-blue-100 rounded-full dark:bg-base-blue-700 dark:text-base-blue-100">
                                Aktif
                            </span>
                        ):datum.status===0?(
                                <span 
                                    className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100" 
                                    onClick={(event)=>{event.preventDefault();handleToast();}}>
                                    <abbr title="Transaksi akan berjalan sesuai dengan tanggal dimulai.">Pending<i className="fa fa-warning"/></abbr>
                                </span>
                        ):datum.status===2?(
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                Selesai
                            </span>
                        ):(
                            <span className="px-2 py-1 font-semibold leading-tight text-base-red-700 bg-base-red-100 rounded-full dark:bg-base-red-700 dark:text-base-red-100">
                                Tidak Aktif
                            </span>
                        )
                    }
                </td>
                <td className="px-4 py-3 text-sm">
                    {
                        datum.status===2?(
                            <Badge>Tarik Modal</Badge>
                        ):"#"
                    }
                </td>
            </tr>
          )
      }
      </>
  );
};
export default Cards;

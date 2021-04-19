import React from 'react';
import { Card, CardBody } from '@windmill/react-ui'
import Helper from 'lib/helper';
import { iTransaksi } from 'lib/interface';
import moment from 'moment'
import Link from 'next/link'

interface iCards {
    dataReport:Array<iTransaksi>;
}
const Report: React.FC<iCards> = ({dataReport}) => {

  return (
        <Card className="md:w-1/2 sm:w-full mt-8 min-h-0">
            <CardBody>
            <div className="flex  justify-between">
                    <p className="mb-4 font-semibold text-gray-700 dark:text-gray-200">Riwayat Transaksi Terbaru</p>
                    <Link href={'/transaksi'}>
                        <p className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
                            <button className="text-xs underline text-blue-700 dark:text-blue-200">Lihat Selengkapnya</button>
                        </p>
                    </Link>
                   
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto  overflow-y-auto  p-5" style={{maxHeight:'600px'}}>
                    {
                        dataReport?.length>0?dataReport.map((item:iTransaksi,i:number)=>{
                            return(
                                <div key={i} className="w-full mb-4 mx-auto border-t border-b border-r rounded">
                                    <div className="p-4 border-l-4 border-teal rounded flex justify-between">
                                        <div>
                                            <div className="m-2 uppercase text-xs font-semibold text-gray-700 dark:text-gray-400">{item.fullname}</div>
                                            <div className="m-2 text-xl font-bold text-gray-700 dark:text-gray-400">{item.kd_trx}</div>
                                            <div className="m-2 pb-2 text-gray-700 dark:text-gray-400 border-b-2 border-grey-lighter">
                                                {item.note}
                                            </div>
                                            <div className="m-2 text-xs font-semibold text-gray-700 dark:text-gray-400">{moment(item.created_at).format("yyyy-MM-DD hh:mm")}</div>
                                        </div>
                                        <div>
                                            <div className="text-right m-2 text-xs font-semibold text-green-200">{Helper.numFormat(item.trx_in)}</div>
                                            <div className="text-right m-2 text-xs font-semibold text-orange-200">{Helper.numFormat(item.trx_out)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }): <div className="m-2 pb-2 text-gray-700 dark:text-gray-400 text-center">Tidak ada data.</div>
                    }
                    </div>
                    
                </div>
                
                
            </CardBody>
        </Card>
  );
};




export default Report;

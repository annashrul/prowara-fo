import React from 'react';
import { Card, CardBody } from '@windmill/react-ui'
import Helper from 'lib/helper';
import { iContent } from 'lib/interface';
import Link from 'next/link'

interface iCards {
    dataBerita:Array<iContent>;
    myElement?: HTMLImageElement;
}
const Cards: React.FC<iCards> = ({dataBerita}) => {

  return (
        <Card className="md:w-1/2 sm:w-full mt-8 min-h-0">
            <CardBody>
                <div className="flex  justify-between">
                    <p className="mb-4 font-semibold text-gray-700 dark:text-gray-200">Berita Terbaru</p>
                    <Link href={'/content/berita'}>
                        <p className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
                            <button className="text-xs underline text-blue-700 dark:text-blue-200">Lihat Selengkapnya</button>
                        </p>
                    </Link>
                </div>
                <div className="overflow-y-auto" style={{maxHeight:'600px'}}>
                {
                    dataBerita?.length>0?dataBerita.map((item:iContent,i:number)=>{
                        return(
                            <div className="flex " key={i}>
                                <div className="h-full text-left px-4 py-4 bg-gray-800 w-full justify-end border-t-2 border-gray-900">
                                    <a className="flex items-center flex-wrap">
                                        <img
                                            alt="testimonial"
                                            className="inline-block object-cover object-center md:w-10 md:h-10 lg:w-16 lg:h-16 sm:w-9 xs:w-9 sm:h-9 xs:h-9 mb-4 bg-gray-100 rounded"  
                                            src={item.picture} />
                                         <span className="flex flex-col flex-grow pl-4">
                                            <Link href={`/content/berita/${item.id}`}>
                                                <span className="font-bold text-lg text-gray-700 dark:text-gray-200 -mt-4">
                                                    <button className="underline text-blue-700 dark:text-blue-200">
                                                        {Helper.removeHtml(item.title.length>40?item.title.substr(0,40)+'..':item.title)} 
                                                    </button>
                                                    
                                                </span>
                                            </Link>
                                            <span className="text-xs text-gray-500 uppercase font-bold">
                                                <div dangerouslySetInnerHTML={{__html: item.caption.length>60?item.caption.substr(0,60)+'..':item.caption}}></div>
                                                
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>

                        );
                    }):<div className="mt-3 pb-2 text-gray-700 dark:text-gray-400 text-center">Tidak ada data.</div>

                }
                </div>
                
                
                
            </CardBody>
        </Card>
  );
};




export default Cards;

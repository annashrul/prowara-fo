


import React from 'react';
import Nomine from 'components/Common/nominal'

interface iCards {
    handleClick:(nominal:number)=>void;
}
const Cards: React.FC<iCards> = ({handleClick}) => {
    const [poin,setPoin] = React.useState(0)
    const cbPoin=(num:string)=>{
        setPoin(parseInt(num));
    }
    const nominalPoin=['100000','200000','300000','400000','500000','600000']
    return (
        <>
            <div className="h-auto mt-16 w-full flex flex-row md:flex-col justify-center items-center mb-20">
                <div className="bg-white dark:bg-gray-700 shadow-md  overflow-hidden  md:mx-24">
                    <div className="py-8 px-8">
                        <div className="grid grid-cols-2 gap-4">
                            {
                                nominalPoin.map((item,key)=>{
                                    return <Nomine key={key} selected={poin===parseInt(item)} Poin={item} cb={cbPoin} />

                                })
                            }
                        </div>
                        <h6 className="mt-8 text-yellow-400 text-sm">Nominal:</h6>
                        <input 
                            type="number" 
                            className="pb-2 pt-3 w-full text-center focus:outline-none border-b-4 border-dashed border-old-gold text-3xl  bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200  p-8" 
                            autoFocus 
                            onChange={(event)=>setPoin(parseInt((event.target.value).replace(/^0+/, ''),10))}
                            value={poin}
                            />
                        <h6 className="text-yellow-400  italic text-sm mt-2">Minimal Deposit: 50000 Poin</h6>
                        <button onClick={(event)=>{event.preventDefault();handleClick(poin);}} className="w-full bg-old-gold hover:bg-old-gold-600 text-gray-700 dark:text-gray-200 px-8 py-4 mt-8">
                            Lanjut
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cards;

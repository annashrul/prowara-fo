import React from 'react';
interface iCards {
}
const Cards: React.FC<iCards> = () => {
  return (
        <tr className="text-gray-700 dark:text-gray-400">
        <td className="px-4 py-3">
            <div className="flex items-center text-sm">
            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" loading="lazy" />
                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
            </div>
            <div>
                <p className="font-semibold">Paket 10jt</p>
            </div>
            </div>
        </td>
        <td className="px-4 py-3 text-sm">
            Rp 10.000.000
        </td>
        <td className="px-4 py-3 text-xs">
            50 Hari
        </td>
        <td className="px-4 py-3 text-sm">
            Rp 150.000
        </td>
        <td className="px-4 py-3 text-sm">
            Senin, 20 april 2015
        </td>
        <td className="px-4 py-3 text-sm">
            70 Hari 12 Jam 30 Menit
        </td>
        <td className="px-4 py-3 text-sm">
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            Approved
            </span>
        </td>
        </tr>
  );
};
export default Cards;

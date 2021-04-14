import {Home,Forms} from 'icons';


const Routes=[
    {
        link:'/',
        title:'Home',
        icon: Home
    },
    {
        link:'/mitra/new',
        title:'Tambah Mitra',
        icon: Forms
    },
    {
        link:'/investment/create',
        title:'Order Paket',
        icon: Forms
    },
    {
        link:'/wallet/deposit',
        title:'Deposit',
        icon: Forms
    },
    {
        link:'/wallet/withdrawal',
        title:'Penarikan',
        icon: Forms
    },
    {
        link:'/transaksi',
        title:'Riwayat Transaksi',
        icon: Forms
    },
    {
        link:'/investment/report',
        title:'Riwayat Investment',
        icon: Forms
    },
    {
        link:'/wallet/deposit/report',
        title:'Riwayat Deposit',
        icon: Forms
    },
    {
        link:'/wallet/withdrawal/report',
        title:'Riwayat Penarikan',
        icon: Forms
    },
  

]

export default Routes;
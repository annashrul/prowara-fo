import {Home,users,Invest,Ticket,poinTf,tiketTf,Deposit,Withdraw,History} from 'icons';


const Routes=[
    {
        link:'/',
        title:'Home',
        icon: Home
    },
    {
        link:'/mitra/new',
        title:'Tambah Mitra',
        icon: users
    },
    {
        link:'/genealogy',
        title:'Genealogy',
        icon: users
    },
    {
        link:'/investment/create',
        title:'Order Paket',
        icon: Invest
    },
    {
        link:'/tiket/order',
        title:'Order Tiket',
        icon: Ticket
    },
    {
        link:'/tiket/transfer',
        title:'Transfer Tiket',
        icon: tiketTf
    },
    {
        link:'/wallet/deposit',
        title:'Deposit',
        icon: Deposit
    },
    {
        link:'/wallet/transfer/poin',
        title:'Transfer Poin',
        icon: poinTf
    },
    {
        link:'/wallet/withdrawal',
        title:'Penarikan',
        icon: Withdraw
    },
    {
        link:'/transaksi',
        title:'Riwayat Transaksi',
        icon: History
    },
    {
        link:'/investment/report',
        title:'Riwayat Investment',
        icon: History
    },
    {
        link:'/wallet/deposit/report',
        title:'Riwayat Deposit',
        icon: History
    },
    {
        link:'/wallet/withdrawal/report',
        title:'Riwayat Penarikan',
        icon: History
    },
  

]

export default Routes;
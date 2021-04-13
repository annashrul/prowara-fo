export interface iUser { 
    id: string,
    foto: string,
    fullname: string,
    mobile_no: string,
    referral: string,
    status: number,
    created_at: string
}

export interface iPaket{
  id:string,
  title:string,
  price:string,
  category:string,
  gambar:string,
  caption:string,
  pin_required:number,
  profit_sharing:number,
  contract:number,
  total_poin:number
}

export interface iOpt{
  value:string,
  label:string,
}

export interface iBankPt{
  id: string;
  bank_name: string;
  logo: string;
  acc_name: string;
  acc_no: string;
  tf_code: string;
}

export interface iBankMember{
  id: string;
  id_member: string;
  bank_name: string;
  acc_name: string;
  acc_no: string;
}

export interface iBankData{
  id:string,
  name:string,
}

export interface iRegist{
    fullname: string;
    mobile_no:string;
    nik:string;
    sponsor:string;
    signup_source:string;
    id_paket:string;
    id_bank_destination:string;
    datumPaket:iPaket;
    typeSponsor:string;
    namaSponsor:string;
    bank:{
      id:string;
      bank_name:string;
      acc_name:string;
      acc_no:string;
    }
}

export interface iInvestment{
  id:string,
  kd_trx:string,
  fullname:string,
  trx_in:string,
  trx_out:string,
  note:string,
  created_at:string,
}

export interface iArrInvestment{
  total:number,
  per_page:number,
  offset:number,
  to:number,
  last_page:number,
  current_page:number,
  from:number,
  data:Array<iInvestment>
  summary:{
    trx_in:string,
    trx_out:string,
    saldo_awal:string,
  }

}


export interface iDeposit{
  id:string,
  kd_trx:string,
  id_member:string,
  fullname:string,
  id_bank_destination:string,
  bank_name:string,
  acc_name:string,
  acc_no:string,
  amount:string,
  unique_code:number,
  status:number,
  payment_slip:string,
  created_at:string,
}

export interface iWithdrawal{
  id:string,
  id_member:string,
  fullname:string,
  id_bank:string,
  bank_name:string,
  acc_name:string,
  acc_no:string,
  amount:string,
  charge:string,
  status:number,
  kd_trx:string,
  created_at:string,
}

export interface iTransaksi{
  id:string,
  kd_trx:string,
  fullname:string,
  trx_in:string,
  trx_out:string,
  note:number,
  created_at:string,
}
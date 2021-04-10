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
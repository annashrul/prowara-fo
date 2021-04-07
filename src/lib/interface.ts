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
  pin_required:number
}

export interface iOpt{
  value:string,
  label:string,
}
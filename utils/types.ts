export type actionFunction=(prevState:any,formData:FormData) => Promise<{message?:string}>

export type CategoryLabel = | 
'Electronics' |
'Clothing' |
'Kitchen' |
'Books' |
'Sports' |
'Personal Care' |
'Toys & Games' |
'Jewelry'


export type ProductCardProps = {
  id:string,
  product:string,
  productPrice:number,
  productDesc:string,
  company:string,
  category:string,
  productQuantity:number,
  image:string,
}

/*
 id:true,
      product:true,
      productPrice:true,
      productDesc:true,
      productQuantity:true,
      company:true,
      image:true,
      category:true,
*/
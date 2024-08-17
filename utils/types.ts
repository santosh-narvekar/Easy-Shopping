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
  productDesc?:string,
  company:string,
  category:string,
  productQuantity:number,
  image:string,
}


export type CartItemProps = {
  Product:ProductCardProps,
  profileId:string,
  productId:string,
  noOfItemsSelected:number,
  id:string
  price:number,
}

export type ReviewCardProps = {
  id:string,
  productId:string,
  profileId:string
  profile:{
    image:string,
    username:string,
    firstName:string,
    lastName:string
  }
  rating:number,
  review:string,
}
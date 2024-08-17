import { type ProductCardProps } from "@/utils/types"
import { Card } from "../ui/card"
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import React from "react";
import Link from "next/link";
import CartDropdown from "../product/CartDropdown";
import CartToggleForm from "../product/CartToggleForm";

type CartItemProps={
  cartId:string,
  profileId:string,
  productId:string,
  price:number,
  noOfItemsSelected:number,
  Product:ProductCardProps
}

function CartItem({cartId,productId,price,noOfItemsSelected,Product}:CartItemProps){
  const {id,company,category,product,productPrice,productQuantity,image} = Product;

  return (
    <Card className="w-full md:p-8 p-4 m-4 ml-0 relative">
      <Link href={`/products/${id}`}>
      
      <div className="flex gap-4 items-center">
        <div className="relative w-[4rem] h-[4rem] md:w-[9rem] md:h-[9rem] rounded-md border-[1px]">
           
           <Image src={image} sizes = {'20vw md:50vw'} fill  alt="product image" />
          
        

        </div>
        <div className=" flex flex-col justify-start ">
          <p className="text-md md:text-lg font-bold ">{product}</p>
          <p className="text-sm text-semibold">from: {company}</p>
          <p className="">category: {category}</p>
          <p className="font-bold text-md mt-1">Total({noOfItemsSelected} items): {formatCurrency(price)}</p>
        </div>

      </div>
      </Link>

      <div className="md:absolute z-10  mt-2 md:mt-0 md:top-3 md:right-3 flex items-center gap-4 ">
          <CartDropdown defaultValue={noOfItemsSelected} productQuantity={productQuantity} isProductPage={false} price={productPrice} cartId={cartId}    />
          <CartToggleForm cartId={cartId} productId={productId} price={price} isProductPage={false}/>        
      </div>
    </Card>
  )
}

export default CartItem

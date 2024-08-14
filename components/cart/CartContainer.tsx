'use client'

import { useEffect } from "react";
import { useCart } from "@/utils/store";
import { ProductCardProps } from "@/utils/types";
import CartItem from "./CartItem";
import CartCheckoutWrapper from "./CartCheckoutWrapper";

type CartItemProps = {
  product:ProductCardProps,
  id:string
  selectedQuantity:number,
  price:number,
}

function CartContainer({cartItems}:{cartItems:CartItemProps[]}){
   const {TotalPrice,selectedQuantity} = useCart(state => state);
   let subTotal:number = 0; 

   useEffect(()=>{
    useCart.setState({
      ItemsInCart:0,
      TotalPrice:cartItems.reduce((_,currentItem)=>{
        subTotal = subTotal + currentItem.price;
        return subTotal;
      },0),
      selectedQuantity:selectedQuantity,
    })
  },[cartItems.length,selectedQuantity])



  return (
    <section className="grid lg:grid-cols-[7fr,3fr] gap-4 w-full  my-4 ">
      <div className="flex flex-col">
      {
        cartItems.map((cartItem)=>{
          return <CartItem key={cartItem.product.id} selectedQuantity={cartItem.selectedQuantity} cartId={cartItem.id} product={cartItem.product} price={cartItem.price}  />
        })
      }   
      </div>
     {
      cartItems.length != 0 && <CartCheckoutWrapper />
     }
    </section>
  )
}

export default CartContainer

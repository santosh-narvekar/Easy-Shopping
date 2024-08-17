'use client'
import CartItem from "./CartItem";
import CartCheckoutWrapper from "./CartCheckoutWrapper";
import { useEffect } from "react";
import { calculateTotals } from "@/utils/actions";
import { useCart } from "@/utils/store";
import { type CartItemProps } from "@/utils/types";

function CartContainer({cartItems}:{cartItems:CartItemProps[]}){

  useEffect(()=>{
    useCart.setState({
      NoOfItemsInCart:0
    })
  },[]);

  useEffect(()=>{
      const calculate=async()=>{
        let cartData = await calculateTotals();
        if(cartData){
        const {totalPrice,orderTotal,tax,deliveryCharge} = cartData;
        useCart.setState({
          subTotal:totalPrice,
          tax:tax ,
          TotalPrice:orderTotal,
          deliveryCharge:deliveryCharge 
        });
      }
      }
     calculate()
  },[cartItems,cartItems.length])

  return (
    <section className="grid lg:grid-cols-[7fr,3fr] gap-4 w-full  my-4 ">
      <div className="flex flex-col">
      {
        cartItems.map((cartItem)=>{
          const {id:cartId,profileId,productId,price,noOfItemsSelected} = cartItem;
          return <CartItem key={cartId} cartId={cartId} productId={productId} profileId={profileId} price={price} noOfItemsSelected={noOfItemsSelected} Product={cartItem.Product}/>
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

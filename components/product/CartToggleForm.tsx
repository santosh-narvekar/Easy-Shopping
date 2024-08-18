'use client';
import { usePathname } from "next/navigation";
import FormWrapper from "../form/FormWrapper";
import { IconButton, ProductCartButton } from "@/utils/Button";
import { useCart } from "@/utils/store";
import Link from "next/link";
import { Button } from "../ui/button";
import { toggleCartAction } from "@/utils/actions";
import { useOptimistic } from "react";

function CartToggleForm({cartId,productId,price,isProductPage}:{
  cartId:string | null,
  productId:string,
  price:number,
  isProductPage:boolean
}){

 const { selectedQuantity  } = useCart(state => state);
 const pathname = usePathname();

  const createToggleCartAction = toggleCartAction.bind(null,{
    cartId:cartId,
    productId:productId,
    ItemsSelected:selectedQuantity,
    price:price,
    pathname
  });

  const [optimisticCartId,setOptimisticCartId] = useOptimistic(
   { 
    cartState:cartId?true:false,
   },
   ({cartState}:{cartState:boolean},action:"ADD_REMOVE_FROM_CART")=>{
      if(action==='ADD_REMOVE_FROM_CART'){
        return {cartState:!cartState}
      }
      return {cartState:false}
    }
  )

const optimizeAndCreateToggleCart=async():Promise<{message:string}>=>{
  setOptimisticCartId('ADD_REMOVE_FROM_CART');

  return await toggleCartAction({
    cartId:cartId,
    productId:productId,
    ItemsSelected:selectedQuantity,
    price:price,
    pathname
  });

  //return {message:`product  ${optimisticCartId?'added to':'removed from'} cart successfully`}
}

  return (
    <>
    {
      optimisticCartId.cartState && isProductPage?<Link href={'/cart'}>
      <Button>Go To Cart</Button> 
      </Link> 
      :
    <FormWrapper action = {optimizeAndCreateToggleCart}>
        {
        cartId ? 
        <IconButton  actionType="delete" className=" hover:bg-red-300 transition-all text-red-500  rounded-full " />
        :
        <ProductCartButton isAddedToCart = { optimisticCartId.cartState ? true : false }   />
        }
    </FormWrapper>
    }
    </>
  )
}

export default CartToggleForm

'use client';
import { toggleCart } from "@/utils/actions";
import { usePathname } from "next/navigation";
import FormWrapper from "../form/FormWrapper";
import { ProductCartButton } from "@/utils/Button";
import { useCart } from "@/utils/store";

function CartToggleForm({cartId,productId,price}:{
  cartId:string | null,
  productId:string,
  price:number
}){
  const pathname = usePathname();
  const {price:productPrice,selectedQuantity} = useCart(state => state);
  

  const toggleCartAction = toggleCart.bind(null,{
          productId,
          cartId,
          pathname,
          price:productPrice <= 0 ? price : productPrice ,
          selectedQuantity
  });

  return (
    <FormWrapper action = { toggleCartAction }>
        <ProductCartButton isAddedToCart = { cartId ? true : false } />
    </FormWrapper>
  )
}

export default CartToggleForm

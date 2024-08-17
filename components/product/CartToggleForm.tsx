'use client';
import { usePathname } from "next/navigation";
import FormWrapper from "../form/FormWrapper";
import { IconButton, ProductCartButton } from "@/utils/Button";
import { useCart } from "@/utils/store";
import Link from "next/link";
import { Button } from "../ui/button";
import { toggleCartAction } from "@/utils/actions";

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


  return (
    <>
    {
      cartId && isProductPage?<Link href={'/cart'}>
      <Button>Go To Cart</Button> 
      </Link> 
      :
    <FormWrapper action = {createToggleCartAction}>

        {
        cartId ? 
        <IconButton  actionType="delete" className=" hover:bg-red-300 transition-all text-red-500  rounded-full " />
        :
        <ProductCartButton isAddedToCart = { cartId ? true : false } />
        }
    </FormWrapper>
    }
    </>
  )
}

export default CartToggleForm

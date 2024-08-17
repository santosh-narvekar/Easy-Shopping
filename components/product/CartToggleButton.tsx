import { ProductSignInButton } from "@/utils/Button";
import { auth } from "@clerk/nextjs/server";
import CartToggleForm from "./CartToggleForm";

async function CartToggleButton({productId,price,cartId,isProductPage=true}:{productId:string,price:number,cartId:string | null,isProductPage?:boolean}){
  const {userId} = auth();
  if(!userId) return <ProductSignInButton />
  
  return <CartToggleForm productId = {productId} cartId = {cartId} price={price} isProductPage={isProductPage} />

}

export default CartToggleButton

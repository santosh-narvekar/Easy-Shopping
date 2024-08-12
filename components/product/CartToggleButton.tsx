import { fetchCartId } from "@/utils/actions";
import { ProductSignInButton } from "@/utils/Button";
import { auth, currentUser } from "@clerk/nextjs/server";
import CartToggleForm from "./CartToggleForm";

async function CartToggleButton({productId,price}:{productId:string,price:number}){
  const {userId} = auth();
  if(!userId) return <ProductSignInButton />
  const cartId = await fetchCartId(productId,userId);
  
  return <CartToggleForm productId = {productId} cartId = {cartId} price={price} />

}

export default CartToggleButton

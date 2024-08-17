import CartContainer from "@/components/cart/CartContainer";
import EmptyList from "@/components/global/EmptyList";
import { fetchCartItems } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CartPage(){
  const user = await currentUser();
  if(!user) redirect('/');
  const cartItems = await fetchCartItems(user.id);

  return (
    <main className="mx-4">
      <h3  className=' text-3xl lg:text-5xl font-bold  mb-2 capitalize' >Shopping Cart</h3>
      <div className="w-full border-t-[1px] border-t-blue-100 my-4">
      {
        cartItems.length == 0 && <EmptyList
        heading="Your cart is empty"
        message="Keep shopping..."
        />
      }    
      </div>
      <CartContainer cartItems={cartItems} />
    </main>
  )
}


export default CartPage

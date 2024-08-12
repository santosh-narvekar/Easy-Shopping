import CartContainer from "@/components/cart/CartContainer";
import EmptyList from "@/components/global/EmptyList";
import { fetchCart } from "@/utils/actions";

async function CartPage(){
  
  const cartItems = await fetchCart();
  
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

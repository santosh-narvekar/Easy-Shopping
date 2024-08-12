import { createOrderAction } from "@/utils/actions"
import FormWrapper from "../form/FormWrapper"
import { Card } from "../ui/card"
import CartForm from "./CartForm"
import ConfirmCart from "./ConfirmCart"
import { useCart } from "@/utils/store"

function CartCheckoutWrapper(){
 const {TotalPrice} = useCart(state => state);
  
  const createOrder = createOrderAction.bind(null,{
    subTotal:TotalPrice
  })

  return (
    <Card className="px-2 py-4  rounded-md w-[100%] h-[320px]  my-4">
      <FormWrapper action={createOrder}>
        <CartForm />
        <ConfirmCart />
      </FormWrapper>
    </Card>
  )
}

export default CartCheckoutWrapper

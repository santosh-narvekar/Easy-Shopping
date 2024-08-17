import { createOrderAction } from "@/utils/actions"
import FormWrapper from "../form/FormWrapper"
import { Card } from "../ui/card"
import CartForm from "./CartForm"
import ConfirmCart from "./ConfirmCart"

function CartCheckoutWrapper(){

  return (
    <Card className="px-2 py-4  rounded-md w-[100%] h-[320px]  my-4">
      <FormWrapper action={createOrderAction} >
        <CartForm />
        <ConfirmCart />
      </FormWrapper>
    </Card>
  )
}

export default CartCheckoutWrapper

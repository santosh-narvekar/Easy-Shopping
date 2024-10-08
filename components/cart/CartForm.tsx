import { formatCurrency } from "@/utils/format"
import { useCart } from "@/utils/store"

function CartForm(){
  const {subTotal,tax,TotalPrice,deliveryCharge} = useCart(state=>state);
  return (
    <div className="w-full">
      <h3 className="text-2xl capitalize font-normal w-full text-center">Checkout Form</h3>
      <div className="flex flex-col justify-start pl-2 mt-8 px-2 border-b-[1px]  w-full border-muted-foreground gap-2 pb-4 text-sm">
      <div className="flex items-center justify-between">
        <p>
        SubTotal 
        </p>
        <p className="font-bold ">
        {formatCurrency(subTotal)}
        </p>
        </div>
      <div className="flex items-center justify-between"><p>
        Tax
        </p>
        <p className="font-bold">
         {formatCurrency(tax)}
        </p>
         </div>
      <div className="flex items-center justify-between">
        <p>
          Delivery Charge
        </p>
        <p className="font-bold">
        {formatCurrency(deliveryCharge)}

        </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between my-3 px-2 text-md font-bold">
        <p className="capitalize">OrderTotal</p>
        <p className="capitalize">{TotalPrice}</p>
      </div>
    </div>
  )
}

export default CartForm

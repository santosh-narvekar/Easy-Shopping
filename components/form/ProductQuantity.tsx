import { Input } from "../ui/input"
import { Label } from "../ui/label"

function ProductQuantity({defaultValue}:{defaultValue?:number}) {
  let name = 'productQuantity'
  
  return (
    <div className='mb-2'>
    <Label className='capitalize'>Min Quantity Per Order</Label>
    <Input type="number"  className='max-w-full rounded-md px-2 py-1 border-[1px]' required name={name} min={1} defaultValue={defaultValue || 1}  />
    </div>
  ) 
}

export default ProductQuantity

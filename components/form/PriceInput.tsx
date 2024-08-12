import { Input } from "../ui/input"
import { Label } from "../ui/label"

function PriceInput({defaultValue}:{defaultValue?:number}) {
    let name = 'productPrice'
  return (
    <div className='mb-2'>
    <Label className=' capitalize '>Price (Rs)</Label>
    <Input type="number" className='max-w-full rounded-md px-2 py-1 border-[1px] ' min={1} defaultValue={defaultValue || 100} required name={name}  />
    </div>
  )
}

export default PriceInput

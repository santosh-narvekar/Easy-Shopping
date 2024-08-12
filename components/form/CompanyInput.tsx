import { Input } from "../ui/input"
import { Label } from "../ui/label"

function CompanyInput() {
   let name = 'company'
  return (
    <div className='mb-2'>
    <Label className=' capitalize '>Company Name(30 limit)</Label>
    <Input className='max-w-full rounded-md px-2 py-1 border-[1px] ' required name={name}   />
    </div>
  )
}

export default CompanyInput

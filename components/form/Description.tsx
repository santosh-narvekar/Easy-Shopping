
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextAreaInputProps = {
  name:string;
  labelText?:string;
  defaultValue?:string;
}

function Description({name,labelText,defaultValue}:TextAreaInputProps) {

  return (
    <div className='mb-4 w-full'>
      
      <Label htmlFor={name}  className='capitalize' >
         {labelText}
      </Label>

      <Textarea id={name} name={name} rows={5} required className='leading-loose'  defaultValue={defaultValue} />

    </div>
  )
}

export default Description

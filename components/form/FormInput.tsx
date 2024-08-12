import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type FormInputProps = {
  name:string;
  type:string;
  label?:string;
  defaultValue?:string;
  placeholder?:string;
}

function FormInput({name,defaultValue,type,placeholder,label}:FormInputProps) {

  return (
    <div className='mb-2'>
    <Label htmlFor={name} className=' capitalize '>{label || name}</Label>
    <Input id={name} placeholder={placeholder} defaultValue={defaultValue}className='max-w-full rounded-md px-2 py-1 border-[1px] ' required name={name} type={type}  />
    </div>
  )
}

export default FormInput

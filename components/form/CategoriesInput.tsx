'use client'
import { Label } from '@/components/ui/label';
import { categories } from '@/utils/categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const name = 'category';

function CategoriesInput({defaultValue}:{defaultValue?:string}) {
  const [value,setValue] = useState('Electronics');

  return (
    <div className='mb-2 '>

      <Label htmlFor={name} className='capitalize'>Categories</Label>

      <Select  defaultValue={defaultValue || categories[0].label} name={name} required onValueChange={(value)=>setValue(value)}>
        
        <SelectTrigger id = {name} >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
           {
           categories?.map((item)=>{
            return <SelectItem key={item?.label} value={item.label} >
              <span className='flex items-center gap-2'>
                <item.icon /> {item.label}
              </span>
            </SelectItem>
           })
           }
        </SelectContent>
      </Select>      

      <Label htmlFor={name}>
        SubCategories
      </Label>



      <Select defaultValue={categories[0].subCategories[0]} name={'subCategory'} required>
        
        <SelectTrigger id = {'subCategory'} >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
           {
           
           categories?.map((item)=>{
            if(item.label === value){
              return item.subCategories.map((subCategory) => {
               return <SelectItem key={item?.label} value={subCategory} defaultValue={subCategory}  >
              <span className='flex items-center gap-2'>
                {subCategory}
              </span>
            </SelectItem>
              })
            }
           })
          }
        </SelectContent>
      </Select>    

    </div>
  )
}

export default CategoriesInput

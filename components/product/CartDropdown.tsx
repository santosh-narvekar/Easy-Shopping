'use client'
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCart } from '@/utils/store';

function CartDropdown({productQuantity,price = 0,cartId,defaultValue,setQuantity=true}:{productQuantity:number,price:number,cartId?:string | null,defaultValue?:number,setQuantity?:boolean}){

  const {selectedQuantity} = useCart( state => state );
  
  const handleSelected = (value:number)=>{
    useCart.setState({
      selectedQuantity:value,
      price:price * value
    })
  }

  let ItemsUserCanSelect = Array.from({length:productQuantity},(_,i)=>{
    let val = productQuantity - i;
    return val;
  })

  return <div className = ' flex flex-col gap-[1px] ' >
 {setQuantity && <h4> Quantity : </h4>}
 <Select disabled={cartId ? true : false }  onValueChange={(value) => handleSelected(Number(value))}>
    <SelectTrigger className='w-[90px]' defaultValue={defaultValue?.toString() || selectedQuantity?.toString()} >
          <SelectValue placeholder={defaultValue || selectedQuantity} />
    </SelectTrigger>

    <SelectContent>
      {
        ItemsUserCanSelect.map((item)=>{
          return <SelectItem key={item} value={item.toString()}>  
             {item}
          </SelectItem>
        })
      }
    </SelectContent>

    
  </Select>
  </div>
}

export default CartDropdown

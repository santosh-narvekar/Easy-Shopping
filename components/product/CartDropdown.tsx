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

function CartDropdown({productQuantity,price = 0,cartId}:{productQuantity:number,price:number,cartId:string | null}){

  const {selectedQuantity} = useCart( state => state );
  

  const handleSelected=(value:number)=>{
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
  <h4> Quantity : </h4>
  <Select disabled={cartId ? true : false }  onValueChange={(value) => handleSelected(Number(value))}>
    <SelectTrigger className='w-[90px]' defaultValue={selectedQuantity?.toString()} >
          <SelectValue placeholder={selectedQuantity} />
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

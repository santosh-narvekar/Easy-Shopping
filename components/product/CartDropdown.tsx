'use client'
import { useCart } from '@/utils/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { updateCartAction } from '@/utils/actions';
import { useEffect, useState } from 'react';

function CartDropdown({defaultValue=0,productQuantity,isProductPage=true,cartId,price}:{defaultValue?:number,productQuantity:number,isProductPage?:boolean,cartId?:string,price?:number}){
  
  
  useEffect(()=>{
    useCart.setState({
      selectedQuantity:1
    })
  },[])

  const {selectedQuantity} = useCart( state => state );
  const [loading,setLoading] = useState(false)

  const ItemsInStock = Array.from({length:productQuantity},(_,i)=>{
    return i + 1 
  })

  const handleSelectedQuantity = (value:number)=>{
    
    useCart.setState({
      selectedQuantity:value,  
    })

  }

  const updateQuantity = async(value:number) => {
    setLoading(true);
    try{
      if(cartId && price) await updateCartAction(cartId,value,price);
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }     
  }

  return <div className = ' flex flex-col gap-[1px] ' >
  {isProductPage && <h4> Quantity : </h4>}
 <Select  disabled={loading} onValueChange={(value) => isProductPage? handleSelectedQuantity(Number(value)) :updateQuantity(Number(value))
}>
    <SelectTrigger className='w-[90px]' defaultValue={defaultValue.toString() || selectedQuantity.toString()}  >
          <SelectValue placeholder={defaultValue || 1} />
    </SelectTrigger>

    <SelectContent>
      {
       ItemsInStock.map((item)=>{
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

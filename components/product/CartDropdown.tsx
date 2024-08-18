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

function CartDropdown({defaultValue=0,productQuantity,isProductPage=true,cartId,price,setOptimized}:{
  defaultValue?:number,productQuantity:number,isProductPage?:boolean,cartId?:string,price?:number,
  setOptimized?:(action:{price:number,noOfItemsSelected:number,cartId:string})=>void
}){
  const [prevValue,setPrevValue] = useState(0);
  
  useEffect(()=>{
    useCart.setState({
      selectedQuantity:1
    })
    setPrevValue(defaultValue)
  },[])

  const {selectedQuantity} = useCart( state => state );
  const [loading,setLoading] = useState(false)
  const {TotalPrice,tax,deliveryCharge,subTotal} = useCart(state=>state);
  const ItemsInStock = Array.from({length:productQuantity},(_,i)=>{
    return i + 1 
  })

  const handleSelectedQuantity = (value:number)=>{
    useCart.setState({
      selectedQuantity:value,  
    })

  }

  const updateQuantity = async(value:number) => {

    if(value === prevValue){
      useCart.setState({
        subTotal:subTotal,
      })
    }

    if(prevValue == 0) setPrevValue(value); 
    
    if(value >= prevValue){ 
      const difference = value - prevValue 
      useCart.setState({subTotal:subTotal + (price! * difference)});
      useCart.setState({tax:Math.floor((subTotal + (price! * difference))  * 0.01)}) 
      useCart.setState({
         TotalPrice:(subTotal +  (price! * difference)) + ((subTotal + (price! * difference)) * 0.01)  + deliveryCharge
      })
      setPrevValue(value)
    }else if(value < prevValue){
      const difference = prevValue - value
      useCart.setState({subTotal:subTotal - (price! * difference)});
      useCart.setState({tax:Math.floor((subTotal - (price! * difference)) * 0.01)})  
      useCart.setState({  
        TotalPrice:(subTotal -  (price! * difference)) + ((subTotal - (price! * difference)) * 0.01)  + deliveryCharge
      })
      setPrevValue(value)
    }



    if(setOptimized){
      setOptimized({
        noOfItemsSelected:value,
        price:price! *  value,
        cartId:cartId!
      })
    }

    if(cartId && price) await updateCartAction(cartId,value,price);    
  }

  return <div className = ' flex flex-col gap-[1px] ' >
  {isProductPage && <h4> Quantity : </h4>}<Select  disabled={loading} onValueChange={(value) => isProductPage? handleSelectedQuantity(Number(value)) :updateQuantity(Number(value))}>
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

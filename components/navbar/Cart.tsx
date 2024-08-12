'use client'
import { Button } from '@/components/ui/button';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/utils/store';

function Cart({Items}:{Items:string | number}) {
  const {ItemsInCart} = useCart(state => state);

  useEffect(()=>{
    useCart.setState({
      ItemsInCart:Number(Items) || 0
    })
  },[Items]);
  
  return (
    <Link href={'/cart'}>
    <Button className='border-[1px] border-none rounded-md px-2 py-2 text-white relative' size='icon'>
      <LuShoppingCart className='w-6 h-6' />  
      <div className={`h-6 w-6 absolute bg-pink-500 font-normal px-[1px] py-[1px] rounded-full text-sm -right-2 -top-2 ${ItemsInCart?'block':'hidden'}`}>
        {ItemsInCart}
      </div>        
    </Button>
    </Link>
  )
}

export default Cart

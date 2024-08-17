'use client'
import { Button } from '@/components/ui/button';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';
import { useCart } from '@/utils/store';
import { useEffect } from 'react';

function Cart({NoOfItems}:{NoOfItems:number}){

  const {NoOfItemsInCart} = useCart(state=>state);

  useEffect(()=>{
    
    useCart.setState({
      NoOfItemsInCart:NoOfItems
    })

  },[]);

  return (
    <Link href={'/cart'}>
    <Button className='border-[1px] border-none rounded-md px-2 py-2 text-white relative' size='icon'>
      <LuShoppingCart className='w-6 h-6' />  
      <div className={`h-6 w-6 absolute bg-pink-500 font-normal px-[1px] py-[1px] rounded-full text-sm -right-2 -top-2 ${NoOfItemsInCart > 0 ?'block':'hidden'}`}>
        {NoOfItemsInCart}
      </div>        
    </Button>
    </Link>
  )
}

export default Cart

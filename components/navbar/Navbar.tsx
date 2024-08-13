import React, { useEffect } from 'react'
import Logo from './Logo'
import SearchInput from './SearchInput'
import SideNavigation from './SideNavigation'
import Theme from './Theme'
import Cart from './Cart'
import { getItemsInCart } from '@/utils/actions'
import { currentUser } from '@clerk/nextjs/server'


async function Navbar(){
  const user = await currentUser();
  const getItems = await getItemsInCart(user?.id || null);
  //console.log('get',getItems)
  
  return <nav className=' navbar z-40 dark:bg-primary-foreground border-b-[1px] max-w-full px-4 md:px-8  py-8  flex items-center flex-wrap md:flex-nowrap justify-between '>
      <Logo />
      <SearchInput />
      <div className='flex items-center gap-4 md:my-0 my-3'>
        <Cart Items={getItems} />
        <Theme />
        <SideNavigation />
      </div>
    </nav>
  
}

export default Navbar

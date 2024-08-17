import Logo from './Logo'
import SearchInput from './SearchInput'
import SideNavigation from './SideNavigation'
import Theme from './Theme'
import { currentUser } from '@clerk/nextjs/server'
import Cart from './Cart'
import { fetchCartItemCount,  } from '@/utils/actions'


async function Navbar(){
  const user = await currentUser();
  const cartItem = await fetchCartItemCount(user?.id!);
  
  return <nav className='navbar z-40 dark:bg-primary-foreground border-b-[1px] max-w-full px-4 md:px-8 py-2 md:py-8  flex items-center flex-wrap md:flex-nowrap justify-between'>
      <Logo />
      <SearchInput />
      <div className='flex items-center gap-4 md:my-0 my-3'>
        <Cart NoOfItems={cartItem || 0} />
        <Theme />
        <SideNavigation />
      </div>
    </nav>
  
}

export default Navbar

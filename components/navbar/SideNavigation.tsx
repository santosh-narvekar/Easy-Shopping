
import { LuAlignLeft } from "react-icons/lu"
import UserIcon from "./UserIcon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { links } from '@/utils/links';
import { Button } from "../ui/button"
import { SignedOut,SignedIn ,SignInButton , SignUpButton } from '@clerk/nextjs';
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import SignOutLink from "./SignOutLink";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

function SideNavigation() {
  const {userId}=auth();
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  return (
    <DropdownMenu>
      
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className=" border-primary border-[1px] flex items-center gap-4 justify-between px-2 py-1 hover:cursor-pointer ">
          <LuAlignLeft className="w-6 h-6"/>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" >
        <SignedOut>
          <DropdownMenuItem>
     
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
     
          </DropdownMenuItem>
      
          <DropdownMenuSeparator />
      
          <DropdownMenuItem>
        
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>

          </DropdownMenuItem>
    

        </SignedOut>
        
        
        <SignedIn >
          {links.map((link) => {
            if(link.title === 'admin' && !isAdminUser) return null;
            return <DropdownMenuItem className="hover:cursor-pointer z-50 capitalize max-w-xl" key={link.title} asChild>
              <Link href={link.href}>
                {link.title}
              </Link>
            </DropdownMenuItem>
        })}
        
      <DropdownMenuSeparator className="border-gray-400" />

        <DropdownMenuItem>
          <SignOutLink />
        </DropdownMenuItem>
        </SignedIn>

      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default SideNavigation

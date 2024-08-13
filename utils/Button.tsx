'use client'
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons"
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "./store";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { useEffect, useOptimistic } from "react";

type ButtonProps = {
  text:string; 
  className?:string
}

type AddToCartButtonProps = {
  quantity:number,
  text:string
}



export const SubmitButton = ({text,className}:ButtonProps) => {
  const {pending} = useFormStatus();  
  return <Button disabled={pending} type="submit" variant={'default'} className={` capitalize  ${className} `}>
    {
        pending?<>
        <ReloadIcon className="pr-2 h-4 w-4 rotate-continuous " />
        Please wait....
        </>:
        text
      }
  </Button>
}

export const FavoritesButton = ({isFavorite}:{isFavorite:Boolean}) => {
  const {pending} = useFormStatus();
  return <Button type='submit' size='icon' variant={'outline'} className="p-2 cursor-pointer"  >
    {
      pending?<ReloadIcon className="rotate-continuous" />:isFavorite?<FaHeart />:<FaRegHeart />
    }
  </Button>
}

export const CardSignInButton = () =>{
  return <SignInButton mode="modal">
    <Button type='button' size='icon' variant='outline' className="p-2 cursor-pointer" asChild>
      <FaRegHeart />
    </Button>
  </SignInButton>
}

export const ProductSignInButton = () =>{
  return <SignInButton mode="modal">
    <Button type='button' size={'lg'} variant='outline' className="px-2 py-1 text-primary  hover:cursor-pointer bg-[#3333ff] hover:bg-[#1a1aff]  " asChild>
      <p>Sign In To Add To Cart</p>
    </Button>
  </SignInButton>
}

export const ProductCartButton = ({isAddedToCart}:{isAddedToCart:boolean}) => {
  const {pending} = useFormStatus();
  
  return <Button type='submit' variant={'outline'} className="p-2 hover:cursor-pointer w-20 bg-[#3333ff] text-primary font-semibold hover:bg-[#1a1aff] transition-all capitalize" disabled={pending} >
    {
      pending ?<p className=" flex items-center justify-center gap-2 ">
       <ReloadIcon className = " rotate-continuous " /> 
       wait ...
      </p>
       :
       <p className="font-bold text-white">
       {isAddedToCart ? 'Remove From Cart' :'Add To Cart'}
       </p>
    }
  </Button>
}

type actionType = 'edit' | 'delete'

export const IconButton = ({actionType,className}:{actionType:actionType,className?:string})=>{
  const {pending} = useFormStatus();

  const renderIcon = () =>{
    switch(actionType){
      case 'edit':
        return <LuPenSquare/>
      case 'delete':
        return <LuTrash2/>
      default:
        const never:never = actionType
        throw new Error(`Invalid action type ${never}`);
    }
  };

 return <Button type="submit" size='icon' variant='link' className={`p-2 cursor-pointer ${className}`}>
  {pending ? <ReloadIcon className="rotate-continuous" /> : renderIcon()}
 </Button>
}
import { type ProductCardProps } from "@/utils/types"
import { Card } from "../ui/card"
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { IconButton, ProductCartButton } from "@/utils/Button";
import CartToggleForm from "../product/CartToggleForm";
import { useEffect } from "react";
import { useCart } from "@/utils/store";
import FormWrapper from "../form/FormWrapper";
import { toggleCart } from "@/utils/actions";
import { usePathname } from "next/navigation";

function CartItem({product,selectedQuantity,cartId,price}:{product:ProductCardProps,selectedQuantity:number,cartId:string,price:number}){
  const {id,image,product:productName,productPrice,productQuantity,company,category} = product;
  const {TotalPrice} = useCart(state=>state);
  const pathname = usePathname();
  
  const toggleCartAction = toggleCart.bind(null,{
          productId:id,
          cartId,
          pathname,
          price:productPrice <= 0 ? price : productPrice ,
          selectedQuantity
  });
  
  return (
    <Card className="w-full p-8 m-4 ml-0 relative">
      <div className="flex gap-4 items-center">
        <div className="relative w-[4rem] h-[4rem] md:w-[9rem] md:h-[9rem] rounded-md border-[1px]">
           <Image src={image} sizes = {'20vw md:50vw'} fill  alt="product image" />
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-md md:text-lg font-bold ">{productName}</p>
          <p className="text-sm text-semibold">from: {company}</p>
          <p className="">category: {category}</p>
          <p className="font-bold text-md mt-1">Product Total: {formatCurrency(productPrice * selectedQuantity)}</p>
        </div>
      </div>

      <div className="md:absolute z-10 text-blue-600 text-bold mt-2 md:mt-0 md:top-3 md:right-3 ">
        <FormWrapper action={toggleCartAction}>
          <IconButton actionType="delete"/>
        </FormWrapper>
      </div>
    </Card>
  )
}

export default CartItem

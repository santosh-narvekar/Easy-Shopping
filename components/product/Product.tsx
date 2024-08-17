import Image from "next/image"
import Link from "next/link"
import FavoriteToggleButton from "../product/FavoriteToggleButton"
import { type ProductCardProps } from "@/utils/types"
import { formatCurrency } from "@/utils/format"
import ProductRating from "./ProductRating"

function Product({list,product}:{list:boolean,product:ProductCardProps}){
  const {id,product:name,productPrice,image,company}=product;
  return (
    <article  className={`relative w-full h-full border-[2px] group rounded-md px-2 py-2`}>
      
      <Link href={`/products/${id}`} className={`${list && 'grid grid-cols-[0fr,auto] gap-2'} `}>

         <div className={`relative h-[200px] md:h-[300px]  ${list && 'w-[120px] sm:w-[200px] h-[100px] md:w-[300px]  '}  mb-2 overflow-hidden  rounded-md  `}>

          <Image src={image} fill alt="product image" className = " rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500 " />

         </div>

         <div className={`flex flex-col ${list?'items-start px-4 mt-1 ':'items-center'} justify-center   gap-2 flex-wrap `}>
          {list && <p className="capitalize text-sm font-bold">From {company}</p>}
          <div className={`flex flex-col ${!list && 'items-center'}`}>
            <p className="text-md md:text-4xl  font-bold">{name.split(' ').length > 2?name.split(' ').slice(0,1).join('').concat('...'):name}</p>
            <p className="font-normal text-sm md:text-md">{formatCurrency(productPrice)}</p>
          </div>
          {list && <ProductRating inPage={false} id={id} />}
        </div>

        <div className={`w-full flex flex-wrap py-1  items-center justify-between ${list?'hidden':'block'}`}>
          <p className="capitalize text-sm font-bold">From {company}</p>
          <ProductRating inPage={false} id={id}/>
        </div>
      </Link>

      <div className='top-5 right-5 z-5 absolute'>
        {/* favorite toggle button */}
        <FavoriteToggleButton productId={id} />
      </div>

    </article>
  )
}

export default Product

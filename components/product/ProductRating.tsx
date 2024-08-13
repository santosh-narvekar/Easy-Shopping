import { FaRegStar, FaStar } from "react-icons/fa"
import { fetchProductRating } from "@/utils/actions"

async function ProductRating({id,inPage}:{
  id:string,inPage:boolean
}){

  const {rating,count} = await fetchProductRating(id);  

  if( Number(count) == 0 ){
   Array.from({length:5},(_,i)=>{
      return <FaRegStar key={i} className="text-gray-400 w-3 h-3" />
   });
  }

  const className = `flex gap-2  items-center ${inPage?'text-lg':'text-sm'} `
  const countText = Number(count) > 1 ? ' reviews': ' review';
  
  const countValue = `(${Number(count)}${inPage?countText:''})`

  const ratings = Array.from({length:5},(_,i)=>{
    if(i < Number(rating) ) return <FaStar key={i} className="text-blue-600 w-3 h-3"/>
    return <FaRegStar key={i} className="text-gray-400 w-3 h-3" />
  });

  return (
    <span className={className}>
      <div className="flex items-center gap-1 py-1">
       {ratings}
      </div>
      {rating}{countValue}
    </span>
  )
}

export default ProductRating

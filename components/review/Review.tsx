'use client'
import Image from "next/image"
import { Card } from "../ui/card"
import { FaStar , FaRegStar } from "react-icons/fa"
import { useState } from "react";
import { Button } from "../ui/button";
import { type ReviewCardProps } from "@/utils/types";

function Review({review,children}:{review:ReviewCardProps,children?:React.ReactNode}){
  const {rating,review:comment} = review;
  const {image,firstName,lastName} = review.profile;
  const [longTextDisplayed,setIsLongTextDisplayed] = useState(false);
 
  const stars = Array.from({length:5},(_,i)=>{
    if(i < rating) return true
    return false
  });

  const handleLongTextDisplayed=()=>{
    setIsLongTextDisplayed(!longTextDisplayed)
  }
  
  const words = comment.split(' ').length > 100;
  const splicedComment = comment.split(' ').slice(0,100).join(' ')
  
  return (
    <Card className="w-full  relative p-4 ">
      
      <div className="flex items-center gap-3 px-4 py-2">
        <Image alt={'user image'} sizes={'50px'} src={image} className="rounded-full" width={50} height={50} />
        <div className="flex flex-col justify-start gap-1">
         <p className="flex items-center ">
          {
            stars.map((check,i)=>{
              if(check) return <FaStar key={i} className={'text-blue-600 w-3 h-3'} />
              else return <FaRegStar key={i}  className="text-gray-400 w-3 h-3" />
            })
          }
         </p>
         <p className="text-sm ">{firstName} {lastName}</p>
        </div>
      </div>

      <div className="w-full overflow-x-auto text-justify text-sm px-4 py-4 font-normal">
        {
          words && !longTextDisplayed ? splicedComment : comment
        }
        
        {
        words && <Button variant={'link'} onClick={handleLongTextDisplayed} className="text-blue-600 hover:text-blue-800 pl-0" >
          {
            longTextDisplayed ? 'Show Less' : 'Show More'
          }
        </Button>
        }

      </div>

      <div className="absolute z-5 top-3 right-3">
        {children}
      </div>
      
    </Card>
  )
}

export default Review

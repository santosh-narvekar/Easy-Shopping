'use client'
import { useState } from "react"
import { Button } from "../ui/button";

function Description({productDesc}:{productDesc:string}){
  const [isLongTextDisplayed,setIsLongTextDisplayed] = useState(false);
  
  const words = productDesc.split(' '); // 100 words

  const setText = () =>{
    setIsLongTextDisplayed(!isLongTextDisplayed)
  }

  return (
    <div className="overflow-x-auto md:max-h-[600px]  ">
      <p className="text-normal text-justify   font-normal text-muted-foreground ">{ words.length > 100 &&  !isLongTextDisplayed ? words.slice(0,100).join(' ').concat('...') : productDesc }</p>
      {
       words.length > 100 && <Button variant={'link'} onClick={setText} className="text-blue-600 hover:text-blue-800 pl-0" >
          {
            isLongTextDisplayed ? 'Show Less' : 'Show More'
          }
        </Button>
      }
    </div>
  )
}

export default Description

'use client'
import { useState } from "react";
import { Card } from "../ui/card"
import { Button } from "../ui/button";
import FormWrapper from "../form/FormWrapper";
import Description from "../form/Description";
import { SubmitButton } from "@/utils/Button";
import RatingInput from "../form/RatingInput";
import { createReviewAction } from "@/utils/actions";

function ReviewDropdown({productId}:{productId:string}) {
  const [isReviewFormVisible,setIsReviewFormVisible] = useState(false);
 
  return (
    <div className="mt-8">
      <Button onClick={()=>setIsReviewFormVisible(prev=>!prev)}>
        Leave a Review
      </Button>  

      
      {
        isReviewFormVisible && <Card className="p-8 mt-8">
          <FormWrapper action={createReviewAction}>
            <input type='hidden' name='productId' value={productId} />
            <RatingInput name="rating" />
            <Description name='review' labelText="your thoughts on this product" defaultValue="Amazing product  !!!" /> 
            <SubmitButton text="Submit" className="mt-4" />
          </FormWrapper>
         </Card>
      }

    </div>
  )
}

export default ReviewDropdown

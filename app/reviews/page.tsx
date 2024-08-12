import FormWrapper from "@/components/form/FormWrapper";
import EmptyList from "@/components/global/EmptyList";
import Review from "@/components/review/Review";
import { deleteReviewAction, fetchMyReviews } from "@/utils/actions"
import { IconButton } from "@/utils/Button";
import { currentUser } from "@clerk/nextjs/server";

async function ReviewPage(){
  const user = await currentUser();
  const reviews = await fetchMyReviews(user?.id!);

  
  return (
    <section>
      <h3 className="text-3xl md:text-4xl capitalize font-bold mx-4 md:mx-8 py-1"> My Reviews </h3>
         <div className="grid md:grid-cols-2 gap-8 my-4 border-t-[1px] py-8 mx-4 md:mx-8   border-blue-100">
          {
            reviews.length == 0 && <EmptyList
              heading="No Reviews From You Yet"
              message="you haven't passed your opinion anywhere! "
              />
          }
  
          {
            reviews.map((review)=>{
              return <Review key={review.id} review={review}>
                <DeleteReview reviewId={review.id}/>
              </Review>
            })
          }
      </div> 
    </section>
        
  )
}

const DeleteReview=({reviewId}:{reviewId:string})=>{
  const deleteReview = deleteReviewAction.bind(null,{reviewId});

  return <FormWrapper action={deleteReview}>
    <IconButton actionType = "delete" />
  </FormWrapper>
}

export default ReviewPage

import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import BreadCrumb from "@/components/product/BreadCrumb";
import CartDropdown from "@/components/product/CartDropdown";
import CartToggleButton from "@/components/product/CartToggleButton"
import Description from "@/components/product/Description";
import ProductRating from "@/components/product/ProductRating";
import ShareButton from "@/components/product/ShareButton";
import Review from "@/components/review/Review";
import ReviewDropdown from "@/components/review/ReviewDropdown";
import { Button } from "@/components/ui/button";
import { fetchCartId, fetchProductDetails, fetchReviewsOnProduct } from "@/utils/actions"
import { IconButton } from "@/utils/Button";
import { formatCurrency } from "@/utils/format";
import { ProductCardProps } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { LuPenSquare } from "react-icons/lu";

async function ProductDetailsPage({params}:{params:{id:string}}){
  const user = await currentUser();

  const product:ProductCardProps | null = await fetchProductDetails(params.id);;  
  const {product:productName,productPrice,id,productDesc,company,productQuantity,image,category} = product!;
  const getReviews = await fetchReviewsOnProduct(id);
  const cartId = await fetchCartId(id,user?.id!)
  const isAdminUser = user && process.env.ADMIN_USER_ID === user.id;
  const isMyReviewOnComment = getReviews.find((review) => review.profileId === user?.id);
  
  return (
  <main className="mx-4">
    <BreadCrumb name={productName}  category={category} />
      <section className=" grid lg:grid-cols-2 gap-4 md:gap-8 max-w-full  ">
        <div className=" rounded-md relative w-full border-[1px] h-[200px] md:h-[300px] lg:h-[500px]">
           <Image fill sizes={'100vw lg:50vw'} src={image} alt={`product of  ${category} category`} className="rounded-md" />
        </div>

        <article className="flex flex-col gap-4 relative">
          <div className="flex md:flex-row flex-col flex-wrap md:items-center gap-4">
            <div className="flex flex-col gap-[4px] justify-start w-[70%] flex-wrap">
              <p className=" text-4xl md:text-6xl font-bold   "> {productName} </p>
              <ProductRating inPage={true} id={id}/>
            </div>
            <div className="flex items-center gap-2 md:absolute right-5 ">
             {isAdminUser &&
                <Link href={`/admin?id=${id}`}>
                  <Button className="p-2 cursor-pointer" variant={'outline'} >
                   <LuPenSquare />
                  </Button>
                </Link> 
             }
              <FavoriteToggleButton productId={id} />
              <ShareButton name={productName} productId={id} />
            </div>
          </div>
          
          <p className = "text-lg text-muted-foreground capitalize gap-4"> Company Name: <span className="font-bold">
             {company}
            </span> 
          </p>
          

          <Description productDesc={productDesc} />
          <p className=" text-md font-normal px-2 py-1 w-max rounded-md bg-[#3333ff] text-white">{formatCurrency(productPrice)}</p>
          <div className = " flex items-end  gap-8 ">
          <CartDropdown productQuantity = {productQuantity} price = {productPrice} cartId={cartId} />
          <CartToggleButton productId = {id} price={productPrice} />
          </div>
        </article>
      </section>

         {
          !isMyReviewOnComment && user &&  <ReviewDropdown productId={id} />
         }
         {


         getReviews.length > 0 &&  <section className="w-full mt-8">
          <p className="text-2xl font-bold text-primary my-2"> Product Reviews </p>
         <div className="grid md:grid-cols-2 gap-8 border-t-[1px] py-8  border-t-muted">
        {
          getReviews.map((review)=>{
            return <Review key={review.id} review={review} />
          })
        }
        </div> 
        </section>
        }
    </main>
  )
}

export default ProductDetailsPage

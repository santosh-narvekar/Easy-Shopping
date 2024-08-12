import EmptyList from "@/components/global/EmptyList";
import Product from "@/components/product/Product";
import { getFavorites } from "@/utils/actions"
import { type ProductCardProps } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";

async function page(){
  const user = await currentUser();
  const favorites = await getFavorites(user?.id!); 
  
  return (
    <>
    <h3 className=" text-3xl md:text-4xl capitalize font-bold mx-8">My Favorites</h3>
    <section className="mx-8 grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4 md:gap-4 my-4 border-t-[1px] py-4 border-blue-100">
      {
        favorites.length === 0 && <EmptyList heading='No Favorites' message = "Add Your Favorites here" />
      }
      
      {
        favorites.map((favProduct)=>{
          return <Product key={favProduct.product.id} list={false} product={favProduct.product} />
        })
      }
    </section>
    </>
  )
}

export default page

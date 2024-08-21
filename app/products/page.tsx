import Categories from "@/components/categories/Categories"
import { Suspense } from "react";
import ProductContainer from "@/components/product/ProductContainer";
import LoadingCards from "@/components/card/LoadingCards";

function HomePage({searchParams}:{searchParams:{category?:string,search?:string,layout?:'grid'|'list',page?:string}}){
  
  return <section className=" w-full ">
      <Categories layout={searchParams?.layout}  />
      <div>
        <Suspense fallback={<LoadingCards />}>
          <ProductContainer category={searchParams.category} search={searchParams.search} layout={searchParams.layout} page={searchParams.page}  />
        </Suspense>
      </div>
    </section>
}

export default HomePage

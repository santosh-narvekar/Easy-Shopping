import Categories from "@/components/categories/Categories"
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Suspense, useState } from "react";
import ProductContainer from "@/components/product/ProductContainer";
import LoadingCards from "@/components/card/LoadingCards";

function HomePage({searchParams}:{searchParams:{category?:string,search?:string,layout?:'grid'|'list'}}){
  
  return <section className=" w-full ">
      <Categories  />
      <div>
        <Suspense fallback={<LoadingCards />}>
          <ProductContainer category={searchParams.category} search={searchParams.search} layout={searchParams.layout}  />
        </Suspense>
      </div>
    </section>
}

export default HomePage

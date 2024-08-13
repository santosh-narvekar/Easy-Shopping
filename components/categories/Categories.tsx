import { categories } from "@/utils/categories"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function Categories({layout}:{layout?:'list' | 'grid'}){
  return (
    <section className={`w-full`}>
     {
    
      /*<h3 className="text-2xl   font-bold leading-loose text-primary w-full text-center"> TAKE A  LOOK AT OUR TOP CATEGORIES... </h3>
       */
     }
     <div className="flex items-center md:flex-nowrap flex-wrap gap-4 md:justify-between px-8 md:px-16  py-4 ">
        {
          categories.map((category)=>{
            return <Link href={`/products/?category=${category.label}&layout=${layout}`} key={category.label} className="group">
             <div className={`flex md:flex-col flex-row items-center justify-center gap-2   group-hover:scale-105   group-hover:transition-all`} >
              <category.icon  className=" w-5 h-5 md:w-8 md:h-8 hover:cursor-pointer text-[#3333ff] "  />
              <p className=" text-xs ">{category.label}</p>
              </div>
              </Link>
          })
        }
      </div>
    </section>
  )
}

export default Categories

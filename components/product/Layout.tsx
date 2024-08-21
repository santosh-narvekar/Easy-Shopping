'use client'
import { usePathname, useSearchParams,useRouter } from "next/navigation"
import { LuLayoutGrid, LuList } from "react-icons/lu"
  
function Layout({productsLength}:{productsLength:number}){
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const {replace} = useRouter();
  const params = new URLSearchParams(searchParams);

  const updateGridLayout = () => {
    params.set('layout','grid')
    replace(`${pathname}?${params}`)
  }

  const updateListLayout = () => {
    params.set('layout','list')
    replace(`${pathname}?${params}`)
  }

  return (
    
       <div className="flex items-center justify-between mx-8 mt-4 py-4 gap-3 ">
        <p className=" text-lg">{productsLength} Product{productsLength > 1 && 's'}</p>
        <div className="flex items-center gap-2">

        <LuLayoutGrid size={35} className={` hover:bg-blue-400  ${params.get('layout')=='grid' && 'bg-blue-400'} transition-all px-2 py-2 hover:cursor-pointer rounded-md `} 
        onClick={updateGridLayout}
        />

        <LuList size={35} className={`hover:bg-blue-400 ${params.get('layout')=='list' && 'bg-blue-400'} px-2 py-2  transition-all focus:bg-blue-400 hover:cursor-pointer rounded-md `}
        onClick={updateListLayout} 
        />

        </div>

      </div>
  )
}

export default Layout

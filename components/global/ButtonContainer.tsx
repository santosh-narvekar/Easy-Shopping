'use client'
import { Button } from "../ui/button"
import { usePathname, useSearchParams,useRouter } from "next/navigation"
import { useState } from "react";
import { LuChevronLeft,LuChevronRight } from "react-icons/lu";
function ButtonContainer({page,totalPages}:{page:number,totalPages:number}){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {replace} = useRouter();
  const buttons = Array.from({length:totalPages},(_,i)=>{
    return i + 1
  })

  const handlePageChange = (page:number)=>{
    const defaultParams = {
      category:searchParams.get('category') || '',
      search:searchParams.get('search') || '',
      layout:searchParams.get('layout') || '',
      page:String(page),
    }
    let params = new URLSearchParams(defaultParams);
    replace(`${pathname}?${params.toString()}`)
  }

  const [curPage,setCurPage] = useState(page);

  function setCurPageAndHandlePage(pageNo:number){
    if(pageNo > totalPages) pageNo = 1
    if(pageNo < 1) pageNo = totalPages

    if(pageNo < 1) setCurPage(totalPages)
    else if(pageNo > totalPages) setCurPage(1)
    else setCurPage(pageNo);

    handlePageChange(pageNo);

  }

  return (
    <div className="flex gap-x-2">
      <Button onClick={()=>setCurPageAndHandlePage(page - 1)} variant={'default'}  className="px-2 py-2"  >
        <LuChevronLeft size={20}/>
      </Button>
      {
        buttons.map(pageNo=>{
          const buttonIndex = pageNo === curPage?'default':'outline'
          const hideShow = `${curPage===pageNo? 'block' : 'hidden'}`
          return <Button key={pageNo} variant={buttonIndex} size={'icon'}  className={`px-2 py-2 hover:cursor-pointer ${hideShow}`}>
            {pageNo}
         </Button>
        })
      }
        <Button  onClick={() => setCurPageAndHandlePage(page + 1)} variant={'default'} className="px-2 py-2" >
          <LuChevronRight size={20}/>
        </Button>
    </div>
  )

}

export default ButtonContainer

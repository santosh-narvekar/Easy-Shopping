'use client'

import { usePathname, useSearchParams,useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { useState,useEffect } from "react";
import {useDebouncedCallback} from 'use-debounce'

function SearchInput() {
  const searchParams = useSearchParams(); 
  const pathname = usePathname();  
  const {replace} = useRouter()

  const [search,setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams);
    if(value){
      params.set('search',value);
    }else{
      params.delete('search')
    }

    replace(`${pathname}?${params}`)
  },500)


  useEffect(()=>{
    if(!searchParams.get('search')) setSearch('');
  },[searchParams.get('search')])

  return (
       <Input placeholder="Type Product name or company..." className="max-w-xs   md:my-0 my-2 input"  
       value={search}
       onChange={(e)=>{
        setSearch(e.target.value);
        handleSearch(e.target.value);
       }}
       type="search"/>
    
  )
}

export default SearchInput

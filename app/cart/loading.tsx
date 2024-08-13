'use client'

import { Skeleton } from "@/components/ui/skeleton"

function loading() {
  return (
    <div className="grid lg:grid-cols-[7fr,3fr] mx-4 gap-4">
      <Skeleton className="w-full h-[100] rounded-md "/>
      <Skeleton className="w-full h-[300px] rounded-md"/>
    </div>
  )
}

export default loading

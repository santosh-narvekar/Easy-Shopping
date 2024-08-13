'use client';
import { Skeleton } from "@/components/ui/skeleton";
function loading(){
  return (
    <div className="mx-8 grid md:grid-cols-2 gap-2 ">
    <Skeleton className="h-[300px] md:h-[500px] w-full rounded "/>
    <Skeleton className="h-[300px] md:h-[500px] w-full rounded "/>
    </div>
  )
}

export default loading

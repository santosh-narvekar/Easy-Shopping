import { Skeleton } from '@/components/ui/skeleton';

function LoadingCards() {
  return (
    <div className='mt-6 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
export function SkeletonCard(){
  return (
    <Skeleton className='h-full  rounded-md p-2' >
      <Skeleton className='h-[200px] md:h-[300px] w-full'/>
    </Skeleton>
  
  )
}
export default LoadingCards

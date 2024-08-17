import ManageOrders from "@/components/orders/ManageOrders"
import CreateProduct from "@/components/product/CreateProduct"
import { Button } from "@/components/ui/button"
import {  fetchAllOrders, fetchProductDetails } from "@/utils/actions"
import { ProductCardProps } from "@/utils/types"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"

async function AdminPage({searchParams}:{searchParams:{id?:string,selected?:string}}) {
  const user = await currentUser();
  if(!user?.privateMetadata?.hasProfile) redirect('/')

  let formData:ProductCardProps | null = null   
  if(searchParams?.id) formData = await fetchProductDetails(searchParams.id!)
  const allOrders = await fetchAllOrders(); 

  return (
    <main className={` grid md:grid-cols-[0.1fr,auto] gap-4 px-4 lg:px-16 py-8 `}>
      <aside className=" flex flex-col items-center  py-1 w-full gap-2 ">
        <p>YOUR ACTIONS</p>
        <Link className="md:w-full" href={'/admin'}>
        <Button  className="md:w-full">Create New Product</Button>
        </Link>
        <Link className="md:w-full" href={`/admin?selected=manageOrders`}  >
        <Button className="md:w-full">Manage All Orders</Button>
        </Link>
      </aside>

      {
        !searchParams?.selected &&  <CreateProduct searchParams={searchParams} formData={formData}/>
      }

      {
        searchParams?.selected && <ManageOrders allOrders={allOrders} /> 
      }

    </main>
  )
}

export default AdminPage

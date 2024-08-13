import CategoriesInput from "@/components/form/CategoriesInput"
import Description from "@/components/form/Description"
import FormInput from "@/components/form/FormInput"
import FormWrapper from "@/components/form/FormWrapper"
import ImageInput from "@/components/form/ImageInput"
import PriceInput from "@/components/form/PriceInput"
import ProductQuantity from "@/components/form/ProductQuantity"
import ManageOrders from "@/components/orders/ManageOrders"
import CreateProduct from "@/components/product/CreateProduct"
import { Button } from "@/components/ui/button"
import { createProductAction, fetchAllOrders, fetchProductDetails, updateProductAction } from "@/utils/actions"
import { SubmitButton } from "@/utils/Button"
import { ProductCardProps } from "@/utils/types"
import Link from "next/link"


async function AdminPage({searchParams}:{searchParams:{id?:string,selected?:string}}) {
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

      {/*
      <section>
        <div className="border-slate-400 border-[1px] rounded-md max-w-full max-h-full px-8 py-8 ">
        <FormWrapper action={checkForSearchParams?updateProductAction:createProductAction} >
         {
         searchParams.id && <input type='hidden' value={searchParams.id} name="id"/>
        }
         <div className="grid md:grid-cols-2 gap-2 mb-4">
          <FormInput type="input" label="Product Name" defaultValue={checkForSearchParams && formData?.product}  placeholder="enter product name..." name="product"  />
          <PriceInput defaultValue={checkForSearchTypeNumberParams && formData?.productPrice}  />
          </div>
          <Description labelText="Product Description(10-1000 words)" name="productDesc" defaultValue={checkForSearchParams && formData?.productDesc}  />
          <div className="grid md:grid-cols-2 gap-2 mb-4">
            <FormInput type="input" label="CompanyName(30 limit)" placeholder="enter company name..." name="company"  defaultValue={checkForSearchParams && formData?.company} />
            <CategoriesInput defaultValue={checkForSearchParams && formData?.category} />
            <ImageInput defaultValue={checkForSearchParams && formData?.image} />
            <ProductQuantity defaultValue={checkForSearchTypeNumberParams && formData?.productQuantity} />
          </div>

          <SubmitButton text={checkForSearchParams?'Update Product':'Create Product'}/>

        </FormWrapper>
        </div>

      </section>
      */}
    </main>
  )
}

export default AdminPage

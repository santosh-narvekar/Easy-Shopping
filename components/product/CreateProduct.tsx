import React from 'react'
import FormWrapper from '../form/FormWrapper'
import { createProductAction, fetchProductDetails, updateProductAction } from '@/utils/actions'
import { ProductCardProps } from '@/utils/types'
import FormInput from '../form/FormInput'
import PriceInput from '../form/PriceInput'
import Description from '../form/Description'
import CategoriesInput from '../form/CategoriesInput'
import ImageInput from '../form/ImageInput'
import ProductQuantity from '../form/ProductQuantity'
import { SubmitButton } from '@/utils/Button'

function CreateProduct({searchParams,formData}:{searchParams:{id?:string,selected?:string},formData:ProductCardProps | null}){
  const checkForSearchParams = searchParams?.id ? true : '';
  const checkForSearchTypeNumberParams = searchParams?.id ? true : 1;
  
  return (
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

  )
}

export default CreateProduct

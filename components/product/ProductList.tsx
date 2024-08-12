import React from 'react'
import Product from './Product'
import { ProductCardProps } from '@/utils/types'

function ProductList({products}:{products:ProductCardProps[]}) {
  return (
    <section className='grid grid-cols-1 my-8 gap-6'>
        {
       
        products.map((product)=>{
         return <Product key={product.id} list={true} product={product} />
        })
       
       }
    </section>
  )
}

export default ProductList

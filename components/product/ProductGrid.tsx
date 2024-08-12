import React from 'react'
import Product from './Product'
import { ProductCardProps } from '@/utils/types'

function ProductGrid({products}:{products:ProductCardProps[]}) {
  return (
    <section className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
      {
        products.map((product)=>{
         return <Product key={product.id} list={false} product={product} />
        })
      }
      
    </section>
  )
}

export default ProductGrid

import React from 'react'
import { Breadcrumb, BreadcrumbLink, BreadcrumbList,BreadcrumbItem, BreadcrumbSeparator , BreadcrumbPage } from '../ui/breadcrumb'

function BreadCrumb({name,category}:{name:string,category:string}) {
  return (
     <Breadcrumb className='my-4'>
       
      <BreadcrumbList>
        
        <BreadcrumbItem>
          <BreadcrumbLink href='/' className='text-md md:text-lg text-gray-400'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink href='/products'  className='text-md md:text-lg text-gray-400'>Products</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
  
        <BreadcrumbItem>
          <BreadcrumbLink href={`/products/?category=${category}`}  className=' text-sm md:text-lg text-gray-400'>{category}</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage  className='text-md md:text-lg text-muted-foreground font-bold capitalize '>{name}</BreadcrumbPage> 
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb

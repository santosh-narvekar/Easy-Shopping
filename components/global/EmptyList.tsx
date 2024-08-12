import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function EmptyList({
  heading = 'No items in the list',
  message = 'Keep exploring our products',
  btnText = 'back to All Products',
}:{heading?:string,message?:string,btnText?:string}) {
  return (
    <div className="mt-4 mx-8 ">
      <h2 className="text-lg md:text-xl font-bold ">{heading}</h2>
      <p className="text-sm md:text-lg">{message}</p>
      <Button asChild className = 'mt-4 capitalize' size='lg'>
        <Link href='/products'>{btnText}</Link>
      </Button>
    </div>
  )
}

export default EmptyList

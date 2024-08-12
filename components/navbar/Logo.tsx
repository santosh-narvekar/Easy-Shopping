import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { VscCode } from 'react-icons/vsc'

function Logo() {
  return (
    <Button asChild variant={'default'} size={'icon'} className='py-1 px-1'>
      <Link href={'/'} ><VscCode className='w-6 h-6' /></Link>
    </Button>
  )
}

export default Logo

'use client'
import { FaHandPointRight } from 'react-icons/fa';
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero1 from '../assets/hero1.jpg';
import product2 from '../assets/product-2.jpg'
import Categories from '../components/categories/Categories'
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
const carouselImages =[Hero1,product2];

export default function Home() {
  return (
   <main className="mx-4 md:mx-8 ">
    <section className=" grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center ">
      <div className=" w-full ">
       <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-5xl">Shop It Easy With Easy Shopping</h1>
       <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          The Perfect Shopping site for Everyone from comforts of
          their home, Experience a shopping experience Like Never Before
          Enjoy shopping!.
       </p>
        <Button className="mt-10" asChild>
          <Link href={'/products'}>
          View Our Products          
          </Link>
          </Button>
      </div>

      <Carousel className="hidden lg:block w-[90%]">      
        <CarouselContent>
          {
           carouselImages.map((image,index)=>{
            return <CarouselItem key={index}>
            <Card>
              <CardContent className="p-2">
                <Image src={image}  alt="main product image"  className = " w-full h-[24rem] rounded-md object-cover" sizes="md:100vw lg:50vw" />
              </CardContent>
            </Card>
          </CarouselItem>
           })
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>

    </section>

    <section className="mt-14 md:mt-10"> 
      <h3 className="capitalize text-2xl md:text-3xl font-bold">Why Shop With Us?</h3>
      <div className='grid md:grid-cols-2 gap-4 p-0 m-4  md:p-2 md:m-8  '>
        <div className='flex flex-col justify-start gap-8 mt-1'>    
            {GridComponent('We are the best at our job')}
            {GridComponent('Over 1000s of order\'s dispatched')}
            {GridComponent('7 days Delivery Guarantee')}
        </div>
        <div className='flex flex-col gap-8 mt-2 justify-start'>
            {GridComponent('In Business for 7 years')}
            {GridComponent('Trusted Product Delivery Mechanism')}
        </div>
        </div>

        
    </section>
  </main>
  );
}

const GridComponent = (text:string) =>{
  return <div className='flex items-center gap-3'>
      <div className='flex items-center gap-3'>
            <FaHandPointRight className='text-primary rounded-full w-6 h-6 md:px-1 md:py-1 ' />
            <p className='text-2xl text-muted-foreground'>{text}</p>
      </div>
    </div>
}
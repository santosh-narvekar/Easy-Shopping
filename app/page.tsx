'use client'
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
const carouselImages =[Hero1,product2]
export default function Home() {
  return (
    <main>
    <section className="container grid lg:grid-cols-2 lg:gap-8 lg:grid-[1fr,1fr]">
      <div className="px-2 py-2 ">
        <h1 className="text-5xl leading-tight font-bold "> Shop it Easy with Easy Shopping </h1>
        <p className="my-4 text-md leading-loose text-justify hidden md:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam cum animi fugit magni et omnis porro doloribus ipsa. Magnam saepe molestias molestiae temporibus. Error a officia molestias dolore architecto!
        </p>
        <Button className="my-8 md:my-0" asChild>
          <Link href={'/products'}>
          View Our Products          
          </Link>
          </Button>
      </div>
      <Carousel  plugins={[
        Autoplay({
          delay: 2000,
        })]
      } 
        opts={{loop:true,align:"start"}}>
        <CarouselContent>
          {
           carouselImages.map((image,index)=>{
            return <CarouselItem key={index}>
            <Card>
              <CardContent className="p-2">
                <Image src={image} alt="main product image" className="rounded-md hidden lg:block" sizes=" md:100vw lg:50vw  " />
              </CardContent>
            </Card>
          </CarouselItem>
           })
          }
        </CarouselContent>
      </Carousel>
    </section>


    </main>
   
  );
}

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest,type NextResponse } from 'next/server';
import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async(req:NextRequest,res:NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const user = await currentUser();
  const { orderId } = await req.json();
  const origin = requestHeaders.get('origin');

  const products = await db.cartItem.findMany({
    where:{
      profileId:user?.id
    },
    include:{
      Product:true
    }
  })
  
  const order = await db.order.findUnique({
    where:{
      id:orderId
    },select:{
      id:true,
      ItemsIncluded:true,
      orderTotal:true,
    }
  })
  
  if(!order){
    return Response.json(null,{
      status:404,
      statusText:'Not Found'
    })
  }
  
  const {orderTotal,ItemsIncluded} = order; 
 
  try{
    const session = await stripe.checkout.sessions.create({
    ui_mode:'embedded',
    metadata:{
      orderId:order.id,
    },
    line_items:[
      {
        quantity:ItemsIncluded,
        price_data:{
          currency:'inr',
          product_data:{
            name:`${products.map(prod => prod.Product.product.toString())}`,
            images:products.map(p=>p.Product.image),
            
          },
        unit_amount:Number((orderTotal * 100/ItemsIncluded).toFixed())+ 1 
        }
      },
    ],

    mode:'payment',
    return_url:`${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`
   });

   return Response.json({ clientSecret:session.client_secret });

  }catch(error){
    
    return Response.json(null,{
      status:500,statusText:'Internal Server Error!'
    });

  }

}
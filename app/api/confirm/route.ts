import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import {redirect} from 'next/navigation';
import { NextResponse, type NextRequest } from "next/server";
import db from '@/utils/db';
import { currentUser } from "@clerk/nextjs/server";

export const GET = async(req:NextRequest)=>{
  const {searchParams} = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;
  const user = await currentUser();
  
  try{
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session.metadata?.orderId;
    if(session.status !== 'complete' || !orderId){
      throw new Error("Something went wrong");
    }

    await db.order.update({
      where:{ id:orderId },
      data:{ paymentStatus:true }
    })
    
    await db.cart.deleteMany({
      where:{
        profileId:user?.id,
      }
    })


  }catch(error){

    return NextResponse.json(null,{
      status:500,
      statusText:'Internal Server Error'
    })

  }

  redirect('/orders');
}
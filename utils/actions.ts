'use server'

import { clerkClient,currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createReviewSchema, imageSchema, productSchema, profileSchema, validateWithZod } from "./schemas";
import { uploadImage } from "./supabase";
import db from './db'
import { revalidatePath } from "next/cache";
import { calculateTotals, deliveryCharge, tax } from "./format";
import { ProductCardProps } from "./types";

const getAuthUser = async() => {
  const user = await currentUser();
  if(!user) throw new Error('You must be logged in to access this route'); 
  if(!user.privateMetadata.hasProfile) redirect('/about/create')
  return user; 
}

// checking for admin user
const getAdminUser = async() => {
  const user = await getAuthUser();
  if(user.id !== process.env.ADMIN_USER_ID) redirect('/');
  return user;
}

const renderError = (error:unknown)=>{  
  return {message:error instanceof Error?error.message:'there was an error'};
} 

export const createProfileAction = async(prevState:any,formData:FormData) => {  
  try{
    const user = await currentUser();
    console.log(user);
    if(!user) throw new Error('Please login to create a profile');
    console.log(prevState);
    console.log('formData',formData)
    const rawData = Object.fromEntries(formData);
  
    console.log('rawData',rawData);
    
    const validatedFields = validateWithZod(profileSchema,rawData);

    console.log('result',validatedFields);
    await db.profile.create({
      data:{
        clerkId:user.id,
        email:user.emailAddresses[0].emailAddress,
        image:user.imageUrl ?? '',
        ...validatedFields
      }
    })

    clerkClient.users.updateUserMetadata(user.id,{
      privateMetadata:{
         hasProfile:true    
      }
    });

  }catch(error){
    return renderError(error)    
  }

  redirect('/');
}


export const fetchProfileImage = async() => {
  const user = await currentUser();
  if(!user) return null;

  const profile = await db.profile.findUnique({
    where:{
      clerkId:user.id
    },
    select:{
      image:true
    }
  });
  
  return profile?.image;
}


export const fetchProfile = async() => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where:{
      clerkId:user.id
    }
  })

  if(!profile) redirect('/about/create');
  return profile
}

export const updateProfileAction = async(prevState:any,formData:FormData):Promise<{message:string}> => {
  const user = await getAuthUser();
  try{
    const rawData = Object.fromEntries(formData);
    const image = formData.get('image') as File;

    const validatedFields = validateWithZod(profileSchema,rawData);
    const validatedFile = validateWithZod(imageSchema,{image});

    const fullPath = await uploadImage(validatedFile.image);
    
    await db.profile.update({
      where:{
        clerkId:user.id
      },
      data:{
        ...validatedFields,
        image:fullPath
      }
    })

    revalidatePath('/about');
    return {message:'Profile Updated Successfully'}
  }catch(error){
    return renderError(error);
  }
}

export const createProductAction = async(prevState:any,formData:FormData) => {
  await getAdminUser();
  try{
    const rawData = Object.fromEntries(formData);
    const image = formData.get('image') as File;

    console.log(rawData)


    const validatedFields = validateWithZod(productSchema,rawData);
    const validateFile = validateWithZod(imageSchema,{image});
    const fullPath = await uploadImage(validateFile.image);
    
    await db.product.create({
      data:{
        ...validatedFields,
        image:fullPath        
      }
    })

    revalidatePath('/admin');
  
  } catch(error) {
    return renderError(error);
  }

  return {message:'product created'}
}

export const updateProductAction = async(prevState:any,formData:FormData):Promise<{message:string}>=>{
    await getAdminUser();
    const productId = formData.get('id') as string;

    try{

      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZod(productSchema,rawData);
      const image = formData.get('image') as File;
      console.log('image',image)
      if(image?.name){
        const validateFile = validateWithZod(imageSchema,{image});
        const fullPath = await uploadImage(validateFile.image);
        
        await db.product.update({
          where:{
            id:productId,
          },
          data:{
            ...validatedFields, 
            image:fullPath       
          }
        })
      }else{

        await db.product.update({
          where:{
            id:productId
          },
          data:{
            ...validatedFields
          }
        })
      }
      
      revalidatePath('/admin');
      //return {message:'Update Successful for the product'}
    }catch(error){
      return renderError(error);
    }    
    redirect(`/products/${productId}`)
}

export const fetchProducts = async({search='',category}:{
  search?:string,category?:string
}) => {

  const products = await db.product.findMany({
    where:{
      category,
      OR:[
        {product:{contains:search,mode:'insensitive'}},
        {company:{contains:search,mode:'insensitive'}},
        {productDesc:{contains:search,mode:'insensitive'}},
        {productPrice:{equals:Number(search)}}
      ]
    },
    select:{
      id:true,
      product:true,
      productDesc:true,
      productPrice:true,
      productQuantity:true,
      image:true,
      company:true,
      category:true,
    },
    orderBy:{
      createdAt:'desc'
    }
  
  })

  return products
}

export const fetchProductDetails = async(id:string)=>{
  return  db.product.findUnique({
    where:{
      id
    },
    select:{
      id:true,
      product:true,
      productPrice:true,
      productDesc:true,
      productQuantity:true,
      company:true,
      image:true,
      category:true,

    }
  })
}

export const fetchProductRating = async(id:string)=>{
  const result = await db.review.groupBy({
    by:['productId'],
    _avg:{
      rating:true
    },
    _count:{
      rating:true
    },
    where:{
      productId:id
    }  
  })
  
  console.log(result)

  return {rating:result[0]?._avg.rating?.toFixed() ?? 0 , count:result[0]?._count.rating.toFixed() ?? 0}
  
}

export const fetchFavoriteId = async(productId:string) => {
  // we will fetch the favorite id where the productId will be passed through when we will get the productId and we will look for favorite where this condition matches and if it is not there we will return null otherwise we return id
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where:{
      productId,
      profileId:user.id
    },
    select:{
      id:true
    }
  })
  return favorite?.id || null
}

export const toggleFavorite = async(prevState:{
  productId:string,
  favoriteId:string | null,
  pathname:string
}) => {
  const user = await getAuthUser();
  console.log(user.id)
  const {productId,favoriteId,pathname} = prevState;

  try{
    if(favoriteId){
      await db.favorite.delete({
        where:{
          id:favoriteId
        }
      })
    }else{
      await db.favorite.create({
        data:{
          productId,
          profileId:user.id
        }
      })
    }

    revalidatePath(pathname);
    return {message:favoriteId ? ' Removed from Faves' : ' Added to Faves '}
  }catch(error){
    return renderError(error);
  }
}


export const fetchCartId = async(productId:string,profileId:string)=>{
  //const user = await getAuthUser();
  const cartId = await db.cart.findFirst({
    where:{
      productId,
      profileId:profileId
    },
    select:{
      id:true
    }
  })

  return cartId?.id || null
}

export const toggleCart = async(prevState:{productId:string,cartId:string | null,pathname:string,price:number,selectedQuantity:number})=>{
  const user = await getAuthUser();
  const {productId,cartId,pathname,price,selectedQuantity} = prevState;
  try{
    if(cartId){
      await db.cart.delete({
        where:{
          id:cartId,
          productId:productId
        }
      })
    }else{
      if(selectedQuantity <= 0){
        return {message:'Please select a quantity before proceeding'}
      }else{
        await db.cart.create({
          data:{
            profileId:user.id,
            productId:productId,
            selectedQuantity,
            price
          }
        })
      }
    }
 
    revalidatePath(pathname);
    return {message:cartId?'Product Removed from Cart':' Product Added to Cart '}
  }catch(error){
    return renderError(error);
  }
}

export const getItemsInCart = async(id:string | null):Promise<string | number> => {
  
  if(!id) return 0
  
  let sum = await db.cart.groupBy({
    by:['profileId'],
    _sum:{
      selectedQuantity:true
    },
    where:{
      profileId:id
    }
  })
 console.log('sum',sum)
  return sum[0]?._sum.selectedQuantity?.toFixed() ?? 0
}

export const getFavorites = async(profileId:string) => {
  await getAuthUser();
  
  const favProducts = await db.favorite.findMany({
    where:{
      profileId
    },
    select:{
      product:true
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  
  return favProducts
}

export const createReviewAction = async(prevState:any,formData:FormData):Promise<{message:string}> => {
  const user =  await getAuthUser();
  try{
    //const =
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZod(createReviewSchema,rawData);
    
    await db.review.create({
      data:{
        profileId:user.id,
        ...validatedFields
      }
    })
    revalidatePath(`/products/${validatedFields.productId}`)
    return {message:'Reviewed on product'}
  }catch(error){
    return renderError(error);
  }
}

export const deleteReviewAction = async(prevState:{reviewId:string}):Promise<{message:string}> => {
  const user = await getAuthUser();
  const {reviewId} = prevState;

  try{
    await db.review.delete({
      where:{
        id:reviewId,
        profileId:user.id
      }
    })

    revalidatePath('/reviews')
    return {message:'Your Review was deleted successfully!'}
  }catch(error){
    return renderError(error);
  }
}

export const fetchReviewsOnProduct = async(productId:string) => {
  const reviews = await db.review.findMany({
    where:{
      productId,
    },
    select:{
      id:true,
      profileId:true,
      productId:true,
      rating:true,
      review:true,
      profile:{
        select:{
          image:true,
          username:true,
          firstName:true,
          lastName:true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return reviews || []
}

export const fetchMyReviews = async(profileId:string)=>{
   await getAuthUser();

  return await db.review.findMany({
    where:{
      profileId
    },
    include:{
      profile:true
    }
  })

}

export const fetchCart = async()=>{
  const user = await getAuthUser();

  const cart =  await db.cart.findMany({
    where:{
      profileId:user.id
    },
    select:{
      product:true,
      selectedQuantity:true,
      price:true,
      id:true
    },
    orderBy:{
      createdAt:'desc'
    },
  })
  return cart
}

export const getProductTotals = async(profileId:string):Promise<string | number> => {
  const price = await db.cart.groupBy({
   by:['profileId'],
   _sum:{
    price:true
   },
   where:{
    profileId
   }
  })

  return price[0]?._sum.price?.toFixed() ?? 0
}

export const createOrderAction = async(prevState:{subTotal:number}) =>{
  const {subTotal} = prevState;
  const user = await getAuthUser();
  const ItemsInCart  = await getItemsInCart(user.id);
  const addedTax = subTotal * tax; 
  const TotalWithTaxAndDelivery = subTotal + deliveryCharge + addedTax 
  let orderId:null | string = null
  await db.order.deleteMany({
    where:{
      profileId:user.id,
      paymentStatus:false
    }
  })

  try{
    const order = await db.order.create({
      data:{
        profileId:user.id,
        orderTotal:TotalWithTaxAndDelivery,
        ItemsIncluded:Number(ItemsInCart)
      }
    })
    orderId = order.id;
  }catch(error){
    return renderError(error)
  }
  redirect(`/checkout?orderId=${orderId}`)
} 

export const fetchMyOrders = async(profileId:string) => {
  return await db.order.findMany({
    where:{
      profileId,
      paymentStatus:true
    },
    include:{
      profile:true,
    }
  })
}

export const fetchAllOrders = async() =>{
  return await db.order.findMany({
    where:{
      paymentStatus:true
    },
    include:{
      profile:{
        select:{
          image:true,
          firstName:true,
          lastName:true,
          address:true
        }
      }
    }
  })
}

export const updateOrder = async(prevState:{id:string,deliveryStatus:boolean}):Promise<{message:string}> =>{
  await getAdminUser();
  const {id,deliveryStatus} = prevState
  try{
    await db.order.update({
      where:{
        id
      },
      data:{
        deliveryStatus:!deliveryStatus
      }
    })
    revalidatePath(`/admin?selected=manageOrders`)
    return {message:`order with order id ${id} successfully updated`}
  }catch(error){
    return renderError(error);
  }
}

export const deleteOrder = async(prevState:{id:string}):Promise<{message:string}> => {
 await getAdminUser();
 const {id} = prevState;
  try{
    await db.order.delete({
      where:{
        id
      }
    })

    revalidatePath(`/admin?selected=manageOrders`)
    return {message:`Order with order id ${id} successfully deleted`}
  }catch(error){
    return renderError(error);
  }
}

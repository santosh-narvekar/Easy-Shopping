'use server'

import { clerkClient,currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createReviewSchema, imageSchema, productSchema, profileSchema, validateWithZod } from "./schemas";
import { uploadImage } from "./supabase";
import db from './db'
import { revalidatePath } from "next/cache";

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
    if(!user) throw new Error('Please login to create a profile');
    const rawData = Object.fromEntries(formData);    
    const validatedFields = validateWithZod(profileSchema,rawData);

    await db.profile.create({
      data:{
        clerkId:user.id,
        email:user.emailAddresses[0].emailAddress,
        image:user.imageUrl ?? '',
        ...validatedFields
      }
    })

    await db.cart.create({
      data:{
         profileId:user.id,
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

export const fetchProfileImage = async(profileId:string) => {

  if(profileId){
    const profile = await db.profile.findUnique({
      where:{
        clerkId:profileId
      },
      select:{
        image:true
      }
    });
    return profile?.image;
  }


  
}


export const fetchProfile = async(profileId:string) => {
  
  const profile = await db.profile.findUnique({
    where:{
      clerkId:profileId
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
  

  return {rating:result[0]?._avg.rating?.toFixed() ?? 0 , count:result[0]?._count.rating.toFixed() ?? 0}
  
}

export const fetchFavoriteId = async(productId:string) => {
  const user = await currentUser();
  if(!user) return null

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
          profileId:user.id,
        },
      })
    }

    revalidatePath(pathname);
    return {message:favoriteId ? ' Removed from Faves' : ' Added to Faves '}
  }catch(error){
    return renderError(error);
  }
}

export const fetchFavorites = async(profileId:string) => {
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
  return await db.review.findMany({
    where:{
      profileId
    },
    include:{
      profile:true,
      product:{
        select:{
          image:true
        }
      }
    }
  })
}

export const fetchCartId = async(profileId:string,productId:string):Promise<string | null> => {
 const cartItem = await db.cartItem.findFirst({
      where:{
        profileId,
        productId
      },
      select:{
        id:true
      }
    })

    return cartItem?.id || null
}

export const toggleCartAction = async(prevState:{cartId:string | null,productId:string,ItemsSelected:number,price:number,pathname:string}):Promise<{message:string}>=>{ 

  const user = await getAuthUser(); 
  const {cartId,productId,ItemsSelected,price,pathname} = prevState
  const TotalPriceCalculated = price * ItemsSelected;
  
  try{
    if(cartId){
    await db.cartItem.delete({
        where:{
          id:cartId,
          profileId:user.id,
          productId
        }
    })
    
    }else{

     await db.cartItem.create({
        data:{
          profileId:user.id,
          productId,
          price:TotalPriceCalculated,
          noOfItemsSelected:ItemsSelected
        }
     })
}

    revalidatePath(pathname);
    return {message:`Item ${cartId?'removed':'added'} to cart successfully!`}
  }catch(err){
    return renderError(err);
  }
}


export const fetchCartItemCount=async(profileId:string)=>{
  
  const cartSum = await db.cartItem.groupBy({
      by:['profileId'],
      _sum:{
        noOfItemsSelected:true
      },
      where:{
        profileId
      }
    })
    return cartSum[0]?._sum.noOfItemsSelected || 0
}

export const fetchCartItems = async(profileId:string) => {

  const cartItem = await db.cartItem.findMany({
      where:{
        profileId
      },
      include:{
        Product:{
          select:{
            id:true,
            product:true,
            productQuantity:true,
            image:true,
            productPrice:true,
            company:true,
            category:true
          }
        }
      },
      orderBy:{
        createdAt:'desc'
      }
  })

  return cartItem;
}

export const updateCartAction = async(cartId:string,quantity:number,productPrice:number):Promise<{message:string}> => {
  const user = await getAuthUser();
  const price = productPrice * quantity;
  try{

    await db.cartItem.update({
      where:{
        id:cartId,
        profileId:user.id
      },
      data:{
        noOfItemsSelected:quantity,
        price
      }
    })

    revalidatePath('/cart');
    return {message:'Item updated successfully!'}
  }catch(err){
    return renderError(err);
  }
}


export const createOrderAction = async() =>{
  const user = await getAuthUser();
  let orderId:null | string = null
  await calculateTotals()  
  const orderTotal = await db.cart.findFirst({
    where:{
      profileId:user.id
    },
    select:{
      TotalPrice:true,
      Tax:true,
      deliveryCharge:true
    }
  });

  const getItems = await db.cartItem.groupBy({
    by:['profileId'],
    _sum:{
      noOfItemsSelected:true
    },
    _count:{
      noOfItemsSelected:true
    },
    where:{
      profileId:user.id
    },
  })

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
        orderTotal:(orderTotal?.TotalPrice || 0) + (orderTotal?.Tax || 0) + (orderTotal?.deliveryCharge || 0),
        ItemsIncluded:getItems[0]?._sum.noOfItemsSelected || 0,
        ProductsIncluded:getItems[0]?._count.noOfItemsSelected || 0
      }
    })
    orderId = order.id;
  }catch(error){
    return renderError(error)
  }

  redirect(`/checkout?orderId=${orderId}`)
} 

export const calculateTotals = async() => {
  const user = await currentUser();
  if(!user) return null;

  const result = await db.cartItem.groupBy({
      by:['profileId'],
      _sum:{
        price:true
      },
      where:{
        profileId:user.id
      }
  });
    
    
  const cart = await db.cart.update({
      where:{
        profileId:user.id
      },
      data:{
        TotalPrice:result[0]?._sum.price || 0,
        Tax:(result[0]?._sum.price || 0) * 0.01
      },
      select:{
        TotalPrice:true,
        Tax:true,
        deliveryCharge:true
      }
  })

  const orderTotal =  (cart?.Tax || 0) + (cart?.TotalPrice || 0) + (cart?.deliveryCharge || 0);

  return {totalPrice:cart.TotalPrice,tax:cart.Tax,orderTotal,deliveryCharge:cart?.deliveryCharge || 0}

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

export const updateOrder = async(prevState:{id:string,deliveryStatus:boolean}):Promise<{message:string}>=>{
  await getAdminUser();
  const {id,deliveryStatus} = prevState;
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
    return {message:`order updated successfully!`}
  }catch(err){
    return renderError(err);
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

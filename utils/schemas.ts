import {z} from 'zod';
import { ZodSchema } from 'zod';

export function validateWithZod<T>(schema:ZodSchema<T>,data:unknown):T{
  // safeParsing
  console.log(data)
  const result = schema.safeParse(data);
  
  console.log('result from schema',result)
  if(!result.success){
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }

  return result.data
}

function validateFile(){
    const maxUploadSize = 1024 * 1024 // 1 megabyte
    const acceptedFilesTypes = ['image/'];
    return z.any().refine((file)=>{
      return !file || file.size <= maxUploadSize
    },'File size must be less than 1mb').refine((file)=>{
      return (!file || acceptedFilesTypes.some((type) => file.type.startsWith(type)) ) 
    },'File must be of type image');
}

export const profileSchema = z.object({
  firstName:z.string().min(2,{
    message:'first name must be at least 2 characters'
  }),
  lastName:z.string().min(2,{
    message:'last name must be at least 2 characters'
  }),
  username:z.string().min(2,{
    message:'username must be at least 2 characters'
  }),
  address:z.string().min(10,{
    message:'address must be at least 10 characters '
  }).max(1000,{
    message:'address could be only upto 1000 characters'
  })
})

export const productSchema = z.object({
  product:z.string().min(3,{
    message:'product name must be at least 3 characters'
  }).max(30,{
    message:'product name must be at least 30 characters'
  }),
  productPrice:z.coerce.number().int().min(1,{
    message:'price must be a positive number'
  }),
  productDesc:z.string().refine((desc)=>{
    const wordCount = desc.split(' ').length;
    return wordCount >= 10 && wordCount <= 1000;
  },{
    message:'description must be between 10 and 1000 characters'
  }),
  company:z.string(),
  category:z.string(),
  productQuantity:z.coerce.number().int().min(1,{
    message:'product quantity must be at least 1'
  })
})

export const imageSchema = z.object({
  image:validateFile()
})

export const createReviewSchema = z.object({
    productId:z.string(),
    rating:z.coerce.number().int().min(1).max(5),
    review:z.string().min(10).max(1000)
}) 
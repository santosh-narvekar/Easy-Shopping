import { IconType } from "react-icons"
import { AiOutlineMobile } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaBicycle } from "react-icons/fa";
import { FaSpa } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaGem } from "react-icons/fa";
import { type CategoryLabel } from "./types";


export type Category = {
  label:CategoryLabel,
  icon:IconType,
  subCategories:string[]
}

export const categories:Category[] = [
  {
   label:'Electronics',
   icon:AiOutlineMobile,
   subCategories:['Mobile Phones','Laptops','Headphones|Earphones','Cameras|Photography']
  },
  {
    label:'Clothing',
    icon:FaTshirt,
    subCategories:['Mens Clothing','Womens Clothing','Kids Clothing','Accessories']
  },
  {
   label:'Kitchen',
   icon:FaKitchenSet,
   subCategories:['Cookware','Small Appliances','Tableware','Kitchen Tools|Gadgets']
  },
  {
    label:'Books',
    icon:FaBook,
    subCategories:['fiction','Non-Fiction','Childrens','Educational']
  },
  {
    label:'Sports',
    icon:FaBicycle,
    subCategories:['Fitness','Outdoor','Team','Water']
  },
  {
    label:'Personal Care',
    icon:FaSpa,
    subCategories:['Skincare','Haircare','Oral Care','Fragnances|Deodorants']
  },
  { 
    label:'Toys & Games',
    icon:FaGamepad,
    subCategories:['Action Figures|Dolls','Board Games|Puzzles','Outdoor','Educational']
  },
  { 
    label:'Jewelry',
    icon:FaGem,
    subCategories:['Necklaces|Pe ndants','Earrings','Rings','Bracelets|Bangles']
  }
] 



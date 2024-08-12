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
  icon:IconType
}

export const categories:Category[] = [
  {label:'Electronics',icon:AiOutlineMobile},
  {label:'Clothing',icon:FaTshirt},
  {label:'Kitchen',icon:FaKitchenSet},
  {label:'Books',icon:FaBook},
  {label:'Sports',icon:FaBicycle},
  {label:'Personal Care',icon:FaSpa},
  {label:'Toys & Games',icon:FaGamepad},
  {label:'Jewelry',icon:FaGem}
] 



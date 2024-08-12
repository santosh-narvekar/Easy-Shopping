import {create} from 'zustand'
type CartState = {
  selectedQuantity:number,
  price:number,
  TotalPrice:number
  ItemsInCart:number
}


export const useCart = create<CartState>(()=>{
  return {
    selectedQuantity:1,
    price:0,
    TotalPrice:0,
    ItemsInCart:0
  }
})
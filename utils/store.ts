
import {create} from 'zustand'

type cartStore={
  selectedQuantity:number,
  NoOfItemsInCart:number,
  subTotal:number,
  tax:number,
  TotalPrice:number,
  deliveryCharge:number

}

export const useCart = create<cartStore>(()=>{
  return {
  selectedQuantity:1,
  NoOfItemsInCart:0,
  subTotal:0,
  tax:0,
  TotalPrice:0,
  deliveryCharge:0
  }
});

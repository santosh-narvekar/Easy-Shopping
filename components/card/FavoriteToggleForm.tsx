'use client'
import { toggleFavorite } from "@/utils/actions";
import { usePathname } from "next/navigation";
import FormWrapper from "../form/FormWrapper";
import { FavoritesButton } from "@/utils/Button";


type FavoriteToggleFormProps ={
  productId:string;
  favoriteId:string | null;
}

function FavoriteToggleForm({productId,favoriteId}:FavoriteToggleFormProps){

  const pathname = usePathname(); 

  const toggleAction = toggleFavorite.bind(null,{
    productId,
    favoriteId,
    pathname
  });

  return (
    <FormWrapper action={toggleAction}>
      <FavoritesButton isFavorite={favoriteId?true:false} />
    </FormWrapper>
  )
}

export default FavoriteToggleForm

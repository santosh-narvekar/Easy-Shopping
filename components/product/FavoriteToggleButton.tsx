import { fetchFavoriteId } from "@/utils/actions";
import { CardSignInButton } from "@/utils/Button";
import { auth } from "@clerk/nextjs/server";
import FavoriteToggleForm from "../product/FavoriteToggleForm";

async function FavoriteToggleButton({productId}:{productId:string}) {

  const {userId} = auth();
  if(!userId) return <CardSignInButton />
  const favoriteId = await fetchFavoriteId(productId);

  return (
    <FavoriteToggleForm favoriteId = {favoriteId} productId = {productId}  />
  )
}

export default FavoriteToggleButton

import ProductGrid from './ProductGrid'
import ProductList from './ProductList'
import { type ProductCardProps } from '@/utils/types'
import { fetchProducts } from '@/utils/actions'
import EmptyList from '../global/EmptyList'
import Layout from './Layout'

async function ProductContainer({category,search,layout}:{
  category?:string,
  search?:string,
  layout?:'grid' | 'list' 
}) {

  const products:ProductCardProps[] = await fetchProducts({
    category,search
  });
  
  return (
    <section> 
        <Layout  productsLength = {products.length} />
       <div className='border-t-blue-100 mx-4 md:mx-8 border-t-[1px]'>
        {
        
          products.length === 0 && <EmptyList heading="No results." message = 'Try changing or removing some of your filters' btnText="clear Filters" />
          
        }
       {
         layout=='list'?<ProductList products={products} />
         :<ProductGrid products={products} />
        }
        </div>
      </section>
  )
}

export default ProductContainer

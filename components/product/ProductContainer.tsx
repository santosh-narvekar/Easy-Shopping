import ProductGrid from './ProductGrid'
import ProductList from './ProductList'
import { type ProductCardProps } from '@/utils/types'
import { fetchProducts } from '@/utils/actions'
import EmptyList from '../global/EmptyList'
import Layout from './Layout'
import ButtonContainer from '../global/ButtonContainer'
import { CardNumberElementComponent } from '@stripe/react-stripe-js'

async function ProductContainer({category,search,layout,page}:{
  category?:string,
  search?:string,
  layout?:'grid' | 'list' 
  page?:string
}) {

  const {products,count,totalPages,page:currentPage}:{products:ProductCardProps[],count:number,totalPages:number,page:number} = await fetchProducts({
    category,search,page
  });
  
  return (
    <section> 
        <Layout  productsLength = {count} />

       <div className='border-t-blue-100 mx-4 md:mx-8 border-t-[1px]'>
        {totalPages > 1 && <div className='mt-4 flex justify-end  mx-4 md:mx-8 '>
          <ButtonContainer page={currentPage} totalPages={totalPages}/>
        </div>
        }
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

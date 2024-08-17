import EmptyList from "@/components/global/EmptyList"
import { formatCurrency } from "@/utils/format"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { currentUser } from "@clerk/nextjs/server";
import { fetchMyOrders } from "@/utils/actions";
import { redirect } from "next/navigation";

async function OrdersPage() {

  const user = await currentUser();
  if(!user) redirect('/')
  const orders = await fetchMyOrders(user.id);
  if(orders.length === 0 ) return <EmptyList />

  return (
    <div className="mt-16 mx-2 container ">
     <h4 className="mb-4 capitalize">
       total Orders Placed : {orders.length}
     </h4>

     <Table>
        <TableCaption>
          A list of your recent orders
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead> No of Items </TableHead>
            <TableHead> Quantity </TableHead>
            <TableHead> Order Total </TableHead>
            <TableHead> Payment Status </TableHead>
            <TableHead> Delivery Status </TableHead>
            <TableHead> Expected delivery </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            orders.map((order)=>{
              const {id,ItemsIncluded,orderTotal,deliveryStatus,paymentStatus,ProductsIncluded} = order
              const formattedCurrency = formatCurrency(orderTotal);
              const checkDeliveryStatus = !deliveryStatus ? 'pending' : 'delivery completed'
              const checkPaymentStatus = paymentStatus ? 'successful' : 'failed';
              const range = 'within 7 days';

              return <TableRow key={id}>
                <TableCell>  
                  {ProductsIncluded}
                </TableCell>

                
                <TableCell>  
                  {ItemsIncluded}
                </TableCell>

                <TableCell >
                  {formattedCurrency}
                </TableCell> 

                <TableCell >
                  {checkPaymentStatus}
                </TableCell>

                <TableCell  >
                  {checkDeliveryStatus}
                </TableCell>

                <TableCell>
                  {range}
                </TableCell>

              </TableRow>
            })
          }
        </TableBody>

     </Table>
    </div>
  )
}

export default OrdersPage

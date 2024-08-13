import { IconButton } from "@/utils/Button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import FormWrapper from "../form/FormWrapper"
import { deleteOrder, updateOrder } from "@/utils/actions"

type OrdersProp={
  id:string,
  profileId:string,
  orderTotal:number,
  ItemsIncluded:number,
  paymentStatus:boolean,
  deliveryStatus:boolean,
  profile:{
    image:string,
    firstName:string
    lastName:string,
    address:string
  }
}[]

function ManageOrders({allOrders}:{allOrders:OrdersProp}) {
  
  return (
    <div className="border-slate-400 border-[1px] rounded-md w-[95%] md:w-full max-h-full px-8  py-8 " >
      <h4 className="mb-4 capitalize">
        Total Orders:{allOrders.length}
      </h4>

      <Table >
        <TableCaption>
          A list of your recent orders
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Address</TableHead>
            <TableHead>Items Dispatched</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {
          allOrders.map(order=>{
           const updateOrderAction = updateOrder.bind(null,{id:order.id,deliveryStatus:order.deliveryStatus})
           const deleteOrderAction = deleteOrder.bind(null,{id:order.id});
           const {ItemsIncluded,id,deliveryStatus} = order;
           const isProductDelivered = deliveryStatus ? 'Delivered' : 'Pending'
           const {address,firstName,lastName} = order.profile;
           const fullName = firstName + " " + lastName
            return <TableRow key={order.id}>
              <TableCell>  
                {id}
              </TableCell>

              <TableCell>
                {fullName}
              </TableCell>

              <TableCell>
                {address}
              </TableCell>

              <TableCell>
                {ItemsIncluded}
              </TableCell>

              <TableCell>
                {isProductDelivered}
              </TableCell>

              <TableCell>
                <FormWrapper action={updateOrderAction}>
                  <IconButton actionType="edit"/>
                </FormWrapper>

                <FormWrapper action={deleteOrderAction}>
                  <IconButton actionType="delete" />
                </FormWrapper>
              </TableCell>

            </TableRow>
          })
        }
        </TableBody>
      </Table>
    </div>
  )
}

export default ManageOrders

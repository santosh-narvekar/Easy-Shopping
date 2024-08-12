type OrdersProp={
  id:string,
  profileId:string,
  orderTotal:number,
  ItemsIncluded:number,
  paymentStatus:boolean,
  deliveryStatus:boolean,
}[]

function ManageOrders({allOrders}:{allOrders:OrdersProp}) {

  return (
    <div className="border-slate-400 border-[1px] rounded-md max-w-full max-h-full px-8 py-8 " >
      {
        allOrders.map(order=>{
          //    const {profile}=order;
          return <h1 key={order.id}>{order.id}</h1>
        })
      }
    </div>
  )
}

export default ManageOrders

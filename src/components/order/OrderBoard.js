import React from 'react';
import PaymentInfo from './PaymentInfo';


const OrderBoard = ({allOrders, handleStatusChange}) => {
  return (
    <>
      {allOrders.map((order)=>(
        <div key={order._id} className="card m-3 pt-2 pb-5">
          <h6 className="">Invoice Id: {order._id}</h6>
          <div><PaymentInfo className="card" order={order}/></div>
          <div className="row">
            <div className="col-md-2 offset-2 text-bold">Change Delivery Status:</div>
            <div className="col-md-2">
              <select
                className=""
                onChange={(e)=> handleStatusChange(order._id, e.target.value)}
                defaultValue={order.orderStatus}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Canceled">Canceled</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
        
      ))}
    </>
  );
}

export default OrderBoard;

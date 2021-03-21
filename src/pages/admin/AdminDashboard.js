import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../components/AdminNav'
import OrderBoard from '../../components/order/OrderBoard';
import { getAllOrders, updateOrderStatus } from '../../functions/adminFunction';
import { toast } from 'react-toastify';



const AdminDashboard = () => {
  const [ allOrders, setAllOrders ] = useState([]);
  const { user } = useSelector((state)=>({...state})); 

  useEffect(()=>{
    loadAllOrders();
  },[])

  const loadAllOrders = () => {
    getAllOrders(user.token)
      .then((res)=>{
        setAllOrders(res.data);
      }).catch((err)=>{
        console.log("All Orders fetch Error", err);
      })
  }

  const handleStatusChange = (orderId, orderStatus) => {
    console.log("Ordr change", orderStatus);
    updateOrderStatus(orderId, orderStatus, user.token)
      .then((res)=>{
        toast.success("Status Updated successfully");
        loadAllOrders();
      })
  }

  return ( 
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <OrderBoard allOrders={allOrders} handleStatusChange={handleStatusChange}/>
        </div>
          
      </div>

    </div>
   );
}
 
export default AdminDashboard;
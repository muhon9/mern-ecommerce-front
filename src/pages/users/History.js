import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../../components/UserNav';
import { getOrders } from '../../functions/userFunctions';
import { CheckCircleOutlined , CloseOutlined  } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';
import PaymentInfo from '../../components/order/PaymentInfo';

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state)=>({...state}));
  
  useEffect(()=>{
    getOrders(user.token)
      .then((res)=>{
          setOrders(res.data);
          console.log("Received order data", res.data);
      }).catch((err)=>{
        console.log("Order Fetch Failed", err);
      })

  },[])

  


  const showOrderInTable = (order) => (
    
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Color</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p,i)=>(
          <tr key={i}>
            <td><b>{p.product.title}</b></td>
            <td>${p.product.price}</td>
            <td>{p.count}</td>
            <td>{p.color}</td>
            <td>{p.product.shipping ? <CheckCircleOutlined className="text-info"/>:<CloseOutlined className="text-danger" />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  
  
  const pdfInvoice = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order}/>}
      fileName="invoice.pdf"
    >
      Download
    </PDFDownloadLink> 
  )

  const showEachOrders = () => (
    orders.map((order,i)=>(
      <div key={i} className="m-5 p-3 card">
        <h6>Order Number: <span className="text-info">{order._id}</span></h6>
        <PaymentInfo order={order}/>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            {pdfInvoice(order)}
          </div>
        </div>
      </div>
    ))
  )

  return ( 
    <div className="container-fluid" >
      <div className="row">
        <div className="col-md-2 float-left">
          <UserNav />
        </div>
        <div className="col-md-8 text-center">
          <h4>{orders.length >0 ? "Purchased Orders": "No Purchased Orders" }</h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
   );
}
 
export default History;
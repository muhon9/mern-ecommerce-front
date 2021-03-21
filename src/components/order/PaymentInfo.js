import React from 'react';

const PaymentInfo = ({order}) => {
  return (
    <p>
      <span><b>Ordered On:</b></span>{" "}
      <span className="badge bg-primary text-white">{new Date(order.paymentIntent.created*1000).toLocaleString("en-US", {dateStyle:"short"})}</span>{"  "}
      <span><b>Paid Amount</b></span>{"  "}
      <span>${(order.paymentIntent.amount/100)}</span>{"  "}
      <span><b>Order Status: </b></span>{"  "}
      <span className="badge bg-primary text-white">{order.orderStatus}</span>{"  "}
      
    </p>
  );
}

export default PaymentInfo;

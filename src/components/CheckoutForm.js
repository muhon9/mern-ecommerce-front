import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { DollarOutlined, CheckCircleOutlined} from '@ant-design/icons'

import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { stripPayment } from '../functions/stripFunction';
import { createOrder, emptyUserCart } from '../functions/userFunctions';

const CheckoutForm = ({history}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [ paymentIntent, setPaymentIntent] = useState(0);
  const [ total, setTotal ] = useState(0);
  const [ payable, setPayable ] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const { user, coupon } = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  useEffect(()=>{
    stripPayment(coupon, user.token)
      .then((res)=>{
        console.log("received secrete key",res.data);
        setTotal(res.data.total);
        setPayable(res.data.payable);
        setClientSecret(res.data.clientSecret);
      })
  },[])


  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },

      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    console.log("payment succes", payload);
    console.log("payment amount", payload.paymentIntent.amount);
    setPaymentIntent(payload.paymentIntent.amount);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch({
        type: "ADD_TO_CART",
        payloads: [],
      });
      dispatch({
        type: "COUPON_APPLIED",
        payloads: false
      });
      if(typeof window != undefined){
        localStorage.removeItem("cart");
      };

      createOrder(payload, user.token)
        .then((res)=>{
          console.log("res from create order",res.data)
          if(res.data.ok){
            emptyUserCart(user.token)
            .then((res)=>{
             console.log("done");
             
           })
          }
        })
    }
  };

  return (
    <>
    {coupon ? (<div className="bg-info">Payment after discount ${payable}</div>):(<div className="text-alert">No Coupon Applied</div>)}
    {succeeded && (<p>${paymentIntent/100} Payment Successfull <Link to="/user/history">Go to order history</Link> </p>)}
    <p></p>
    <Card
      
      //style={{ width: 350, height: 250 }}
     // cover={<img style={{height: '150px', objectFit: 'cover', marginBottom: "-50px" }} alt="example" src={shoppingCart} />}
      actions={
        [<>
          <DollarOutlined className="text-info" />Total Bill ${total}
        </>,
        <>
          <CheckCircleOutlined className="text-info"/>Payable ${payable}
        </>]
      }
    >
    
  </Card>,
    
    <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" className="stripe-input" options={cardStyle} onChange={handleChange} />
    <button
      disabled={processing || disabled || succeeded}
      id="submit"
      className="stripe-button"
    >
      <span id="button-text">
        {processing ? (
          <div className="spinner" id="spinner"></div>
        ) : (
          "Pay now"
        )}
      </span>
    </button>
    {/* Show any error that happens when processing the payment */}
    {error && (
      <div className="card-error" role="alert">
        {error}
      </div>
    )}

    {/* Show a success message upon completion */}

    <p className={succeeded ? "result-message" : "result-message hidden"}>
      Payment succeeded, see your order history
      <a
        href={`https://dashboard.stripe.com/test/payments`}
      >
        {" "}
        Stripe dashboard.
      </a> 
    </p>
  </form>
  </>
  );
}

export default CheckoutForm;

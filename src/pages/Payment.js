import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "../stripe.css";

const promise = loadStripe("pk_test_51ITOtyA0YpsHZEM8Vq94Po6LHVNNCZHeVYRzZfHOEuYt412Ewr8tJrh4qyBa4vE51D8WI9nFMON57CUIsZbr84wL00jaRRoYyu");

const Payment = () => {
  return (
    <div className="container pt-5">
      <h6>Complete Your Purchase</h6>
      <Elements  stripe={promise}>
      <br/>
      
        <div className="col-md-6 offset-md-3">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
}

export default Payment;

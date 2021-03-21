import axios from 'axios';

export const stripPayment = async (coupon,authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,
    {coupon},
    {
      headers:{
       authToken
      }
    }
  );
} 
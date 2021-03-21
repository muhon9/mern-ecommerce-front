import axios from 'axios';

export const userCart = async (cart, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/cart`,
    {cart},
    {
      headers:{
       authToken
      }
    }
  );
} 

export const getCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`,
    {
      headers:{
       authToken
      }
    }
  );
} 

export const emptyUserCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`,
    {
      headers:{
       authToken
      }
    }
  );
} 

export const updateAddress = async (address, authToken) => {
  return await axios.put(`${process.env.REACT_APP_API}/user/address`,
    {address},
    {
      headers:{
       authToken
      }
    }
  );
} 

export const createOrder = async (stripeResponse, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/order`,
    {stripeResponse},
    {
      headers:{
        authToken
      }
    }
    );
}

export const getOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/orders`,
    {
      headers:{
        authToken
      }
    }
    );
}
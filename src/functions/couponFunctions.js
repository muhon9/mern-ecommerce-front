import axios from 'axios';


export const createCoupon = async (coupon, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/coupon`,
  {coupon},
  {
    headers:{
     authToken
    }
  })  
}

export const removeCoupon = async (couponId, authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/coupon/${couponId}`,
  {
    headers:{
     authToken
    }
  })  
}

export const getCoupon = async (coupon, authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/coupon`);
}

export const applyCoupon = async (couponName, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/couponapply`,
  {couponName},
  {
    headers:{
      authToken
    }
  });
}
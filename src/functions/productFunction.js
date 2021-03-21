import axios from 'axios';


export const createProduct = async (values,authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/admin/product`, values, {
    headers:{
      authToken,
    }
  })
}

export const updateProduct = async (slug,values,authToken) => {
  
  return await axios.put(`${process.env.REACT_APP_API}/admin/updateproduct/${slug}`, values, {
    headers:{
      authToken,
    }
  })
}

export const productRating = async (productId, star ,authToken) => {
 
  return await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, {star}, {
    headers:{
      authToken,
    }
  })
}

export const listProducts = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}

export const listConditionally = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort, order, page
  });
}

export const removeProduct = async (slug ,authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/removeproduct/${slug}`, {
    headers:{
      authToken,
    }
  })
}



export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const getTotalProduct = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
}

export const relatedProduct = async (productId) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
}

export const queryProduct = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/product/filter`, arg);
}
import axios from 'axios';

export const getCategories = async ()=>{
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
}

export const getCategory =async (slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
}

export const deleteCategory =async (slug,authToken)=>{
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
    headers:{
      authToken,
    }
  })
}

export const updateCategory =async (slug,category,authToken)=>{
  return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,{name:category},{
    headers:{
      authToken,
    }
  })
}

export const creatCategory =async (category,authToken)=>{
  return await axios.post(`${process.env.REACT_APP_API}/category`,{name:category},{
    headers:{
      authToken,
    }
  })
}



export const getOptionSubs = async (_id)=>{
  return await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
}

export const getCategoryProduct = async (slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}


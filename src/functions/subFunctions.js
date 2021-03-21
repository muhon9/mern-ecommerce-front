import axios from 'axios';

export const getSubs = async ()=>{
  return await axios.get(`${process.env.REACT_APP_API}/subs`);
}

export const getsub =async (slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
}

export const deletesub =async (slug,authToken)=>{
  return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
    headers:{
      authToken,
    }
  })
}

export const updatesub =async (slug,sub,authToken)=>{
  return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,sub,{
    headers:{
      authToken,
    }
  })
}

export const creatsub =async (sub,authToken)=>{
  return await axios.post(`${process.env.REACT_APP_API}/sub`,sub ,{
    headers:{
      authToken,
    }
  })
}

export const getSubCategoryProducts = async (slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
}
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectingTo from './RedirectingTo';
import { currentAdmin } from '../../functions/authFunctions';
import { toast } from 'react-toastify';



const AdminProtectedRoutes = ({children,...rest}) => {
  const { user } = useSelector((state)=>({...state}));
  const [ ok, setOk] = useState(false);

  useEffect(()=>{
    if(user && user.token){
      currentAdmin(user.token)
        .then((res)=>{
          setOk(true);
          
        })
        .catch((err)=>{
          toast.error(err.message);
          
        }
        )
  }},[user])

  return(
    ok ? (<Route {...rest}  />):(<RedirectingTo />)
  )
  
}
 
export default AdminProtectedRoutes;
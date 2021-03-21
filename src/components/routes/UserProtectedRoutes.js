import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectingTo from './RedirectingTo';



const UserProtectedRoutes = ({children,...rest}) => {
  const { user } = useSelector((state)=>({...state}));
  return(
    user && user.token ? (<Route {...rest} render={()=> children} />):(<RedirectingTo />)
  )
  
}
 
export default UserProtectedRoutes;
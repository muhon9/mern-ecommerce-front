import React, { useState, useEffect } from 'react';
import { useHistory }  from 'react-router-dom';



const RedirectingTo = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((curretCount)=> --curretCount);
    },1000)
    if(count === 0){
      history.push('/login');
    };
    return ()=> clearInterval(interval);
  }, [count]);

  return ( 
    <div className="container p-5 text-center">Redirecting in {count} seconds</div>
   );
}
 
export default RedirectingTo;
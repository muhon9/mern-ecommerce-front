import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/subFunctions';

const SubCategoryListing = () => {
  const [subCategories, setSubCategories]= useState([]);
  const [loading, setLoading]= useState(false);

  useEffect(()=>{
    setLoading(true)
    getSubs()
      .then((res)=>{
        setSubCategories(res.data);
        setLoading(false);
      })
  },[])


  const showListing= () => (
     subCategories.map((c)=>(
       <Link to={`/subs/${c.slug}`}> <div key={c._id} className="btn btn-outline-primary" >{c.name}</div></Link>
     
    ))
  )

  return ( 
    <div className="">
      <div className=""><h2>Sub Categories</h2></div>
      <div className="">
        {loading ? (<h3 className="text-center">Loading....</h3>): showListing()}
      </div><br/>
    </div>
   );
}
 
export default SubCategoryListing;

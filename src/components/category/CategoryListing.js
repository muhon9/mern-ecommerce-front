import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/categoryFunctions';

const CategoryListing = () => {
  const [categories, setCategories]= useState([]);
  const [loading, setLoading]= useState(false);

  useEffect(()=>{
    setLoading(true)
    getCategories()
      .then((res)=>{
        setCategories(res.data);
        setLoading(false);
      })
  },[])


  const showListing= () => (
     categories.map((c)=>(
       <Link to={`/category/${c.slug}`}> <div key={c._id} className="btn btn-outline-primary" >{c.name}</div></Link>
     
    ))
  )

  return ( 
    <div className="">
      <div className=""><h2>Categories</h2></div>
      <div className="">
        {loading ? (<h3 className="text-center">Loading....</h3>): showListing()}
      </div><br/>
    </div>
   );
}
 
export default CategoryListing;

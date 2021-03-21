import React, { useEffect, useState } from 'react';
import { listProducts } from '../functions/productFunction';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSeller from '../components/home/BestSeller';
import CategoryListing from '../components/category/CategoryListing';
import SubCategoryListing from '../components/subCategory/subCategoryListing';

const Home = () => {
  const [loading, setLoading]= useState(false);
  const [products, setProducts]= useState([]);



  useEffect(()=>{
    loadproducts();
  },[]);

  
  const loadproducts = () => {
    
    setLoading(true);
    listProducts(6)
    .then((res)=>{
      setLoading(false);
      setProducts(res.data);
      console.log("products", res.data)
      console.log("products--", products)
    })
    .catch((err)=>{
      console.log("Error is", err)
    })

  }
  
  // if(!user){
  //   return <RedirectingTo />
  //   //return <Redirect to="/login" />
  // }

  return (
    <div> 
      <div className="jumbotron">
        <Jumbotron/>
      </div>
      <h3 className="jumbotron mb-5 mt-5 text-center display-4">
        New Arrivals
      </h3>
      <NewArrivals />
      <br/>
      <br/>
      <h3 className="jumbotron mb-5 mt-5 text-center display-4">
        Best Seller
      </h3>
      <BestSeller />
      <CategoryListing />
      <SubCategoryListing />
        
    
    </div>
  );

  
}
 
export default Home;
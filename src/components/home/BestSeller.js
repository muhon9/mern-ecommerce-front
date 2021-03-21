import React, { useEffect, useState } from 'react';
import { listConditionally, getTotalProduct } from '../../functions/productFunction';
import ProductCard from '../cards/ProductCards';
import SkeletonCard from '../cards/SkeletonCard';
import { Pagination } from 'antd';


const BestSeller = () => {
  
  const [loading, setLoading]= useState(false);
  const [products, setProducts]= useState([]);
  const [page, setPage]= useState(1);
  const [total, setTotal]= useState(0);
  const [perPage, setPerPage]= useState(3);


  useEffect(()=>{
    loadproducts();
  },[page]);

  useEffect(()=>{
    getTotalProduct()
      .then((res)=>{
        setTotal(res.data)
      })

  })
  
  const loadproducts = () => {
    
    setLoading(true);
    listConditionally('sold', 'desc', page)
    .then((res)=>{
      setLoading(false);
      setProducts(res.data);
      //console.log("products", res.data)
      //console.log("products--", products)
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
    <>
      <div className="container">
        { loading ? <SkeletonCard count={6}/> : 
          <div className="row justify-content-md-center">
            {products.map((product)=>(
              <div className="col" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        }
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination 
            current={page} 
            total={(total/perPage)*10} 
            onChange={(value)=>(setPage(value))}
          />
        </div>
      </div>
    </>
      
      
  );

  
}
 
export default BestSeller;
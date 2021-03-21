import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'
import AdminProductCards from '../../components/cards/AdminProductCards';
import { listProducts, removeProduct } from '../../functions/productFunction';
import { toast } from 'react-toastify'
import CreateProduct from './CreateProduct';


const ListProducts = () => {
  const { user } = useSelector((state)=>({...state}))
  const [ products, setProducts] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    loadProducts();
  },[])

  const loadProducts = () => {
    setLoading(true);
    listProducts()
      .then((res)=>{
        setLoading(false)
        setProducts(res.data)
      })
      .catch((err)=>{
        setLoading(false);
        console.log(err);
      })
    
  }

  const handleRemove = (slug) => {
    if(window.confirm("Do you want to delete")){
      removeProduct(slug, user.token)
      .then((res)=>{
        toast.error(`${res.data.title} is removed`);
        loadProducts();
      })
      .catch((err)=>{
        toast.error(err.response.err);
      })
    }; 
  }


  return ( 
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
      
        
        <div className="col">
          <div className="row pt-2">
          { loading ? (<h3 className="text-danger">Loading Products..</h3>) : (<h3 className="">All Products</h3>) }
           <div className="col"><Link to="/admin/product"><button className="btn btn-outline-primary float-right">Add New Product</button></Link></div>
          </div>
           
          <div className="row">
            {products && products.map((product)=>{
              return(
                <div className="col-lg-4 p-2" key={product._id}>
                  <AdminProductCards product={product} handleRemove={handleRemove} />
                </div>
              )
            })}

          </div>
          
        </div>
          
        
      
      </div>
    </div>
   );
}
 
export default ListProducts;
import React,{useEffect, useState} from 'react';
import ProductCard from '../../components/cards/ProductCards';
import SkeletonCard from '../../components/cards/SkeletonCard';
import CategoryListing from '../../components/category/CategoryListing';
import { getCategoryProduct } from '../../functions/categoryFunctions';


const CategoryProductHome = ({match, history}) => {

const [categoryProduct, setCategoryProduct] = useState([]);
const [loading, setLoading] = useState(true);
const slug = match.params.slug

useEffect(()=>{
  getCategoryProduct(slug)
    .then((res)=>{
      setCategoryProduct(res.data);
      setLoading(false);
    })
},[slug])



  return ( 
    <>
      {loading? "Loading":
      <div className="jumbotron text-black-50 pt-2 pb-2">
        <h3>Products in this <span className="text-danger">{categoryProduct.category.name}</span> Category</h3>
      </div>
      }
      <div className="container">
        { loading ? <SkeletonCard count={6}/> : 
          <div className="row justify-content-md-center">
            { categoryProduct.products.length ? categoryProduct.products.map((product)=>(
              <div className="col" key={product._id}>
                <ProductCard product={product} />
              </div>
            )):<h5 className=""> We couldn't find any Product in this Category</h5>}
          </div>
        }
      </div>
      <CategoryListing/>
      
      
      
    </>
   );
}
 
export default CategoryProductHome;
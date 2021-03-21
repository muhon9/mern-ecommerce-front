import React,{useEffect, useState} from 'react';
import ProductCard from '../../components/cards/ProductCards';
import SkeletonCard from '../../components/cards/SkeletonCard';
import CategoryListing from '../../components/category/CategoryListing';
import SubCategoryListing from '../../components/subCategory/subCategoryListing';
import { getSubCategoryProducts } from '../../functions/subFunctions';


const SubsCategoryHome = ({match}) => {

const [subCategoryProducts, setSubCategoryProducts] = useState([]);
const [loading, setLoading] = useState(true);
const slug = match.params.slug

useEffect(()=>{
  getSubCategoryProducts(slug)
    .then((res)=>{
      console.log("THis is res", res.data.products)
      setSubCategoryProducts(res.data);
      setLoading(false);
    })
},[slug])



  return ( 
    <>
      {loading? "Loading":
      <div className="jumbotron text-black-50 pt-2 pb-2">
        <h3>Products in this <span className="text-danger">{subCategoryProducts.sub.name}</span> Sub Category</h3>
      </div>
      }
      <div className="container">
      
        { loading ? <SkeletonCard count={6}/> : 
          <div className="row justify-content-md-center">
            { subCategoryProducts.products.length ? subCategoryProducts.products.map((product)=>(
              <div className="col" key={product._id}>
                <ProductCard product={product} />
              </div>
            )):<h5 className=""> We couldn't find any Product in this Category</h5>}
          </div>
        }
      </div>
      <CategoryListing/>
      <SubCategoryListing/>
      
      
      
    </>
   );
}
 
export default SubsCategoryHome;
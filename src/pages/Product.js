import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import ProductCard from '../components/cards/ProductCards';
import SingleProductCard from '../components/cards/SingleProductCard';
import { getProduct, productRating, relatedProduct } from '../functions/productFunction';



const Product = ({match}) => {
  const { user } = useSelector((state)=>({...state}));

  const [product, setProduct] = useState([])
  const [related, setRelated] = useState([])
  const [star, setStar]= useState(0);
  const { slug } = match.params;
  const { rating }= product;

  useEffect(() => {
    loadProduct()
  }, [slug]);

  useEffect(() => {
    console.log("Product", rating )
    if(rating && rating.length && user){
        var rated = rating.find((elem)=>(
          elem.postedBy.toString() === user._id.toString()
        )
      )
      console.log("Rated status", rated)
      if(rated !== undefined){
        setStar(rated.star);
      }
      
    }
  },[rating,user]);

  const loadProduct = () => {
    getProduct(slug)
      .then((res)=>{
        setProduct(res.data);
        console.log("ID", res.data._id)
        relatedProduct(res.data._id)
          .then((res)=>{
            setRelated(res.data);
          })
      })
  }

  const handleStar = (newRating, name) => {
    setStar(newRating);
    productRating(name, newRating, user.token)
      .then((res)=>{
        console.log(res.data)
        loadProduct()
      })
      .catch((err)=>{
        console.log(err.message)
      })
  }
  
  return ( 
    <div className="Container-fluid p-3">
      <div className="row pt-3">
        <SingleProductCard product={product} handleStar={handleStar} star={star} setStar={setStar}/>
        
      </div>

      <div className="row">
        <div className="col text-center pt-4 pb-4">
          <hr/>
            <h4>Related Products</h4>
          <hr/>
        </div>
      </div>
      <div className="row pt-3">{related && related.length ? (related.map((product)=>(
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))):<div className="text-center col">No Related Items Found</div>}</div>
      </div>
   );
}
 
export default Product;
import React from 'react';
import { Link } from 'react-router-dom';



const ProductDetailsList = ({product}) => {
  const {price, category, subs, shipping, color, brand, quantity, sold}= product;

  return ( 
    <ul className="list-group mt-3">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Price: <span className="font-weight-bold">$ {price}</span>
      </li>
      {category && (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Category: <Link to={`/category/${category.slug}`} className="">{category.name}</Link>
      </li>)}
      {subs && (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Subs: { subs.map(s=>(
          <Link key={s._id} to={`/subs/${s.slug}`} className="">{s.name}</Link>
        ))} 
      </li>)}
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Brand: <span className=""> {brand}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Color: <span className=""> {color}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Shipping: <span className="">{shipping}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Available: <span className="">{quantity>0 ? quantity: <div className="text-danger font-weight-bold">Stock Out</div>}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Sold: <span className="">{sold}</span>
      </li>
      
      
    </ul>
   );
}
 
export default ProductDetailsList;
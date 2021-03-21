import React, {useState} from 'react';
import {Link } from 'react-router-dom'
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import _, { isEqual } from 'lodash';
import noimage from '../../images/noimage.png';
import { ratingFunction } from '../../functions/ratingFunction';
import { useSelector, useDispatch} from 'react-redux';

const { Meta } = Card;

const ProductCard = ({product}) => {

  const { images, price, title, slug, description, rating} = product;
  const [tooltip, setTooltip] = useState("Click to add to cart");

  //redux
  const {user, cart} = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  const handleCart = () => {
    //console.log("Added to cart");
    let cart = [];
    if(typeof window != undefined){
      // if cart is already in local storage
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // add the product to the cart
      cart.push({
        ...product,
        count:1,
      })
      // checking for duplicate item before saving to localStorage
      let unique = _.unionWith(cart, isEqual);
      //console.log("Unique", unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Already Added");
      dispatch({
        type: "ADD_TO_CART",
        payloads: unique,
      })
      dispatch({
        type: "SET_VISIBLE",
        payloads: true
      })
    }
  }

  return ( 
    <> 
      <div className="container">
        { (rating && rating.length>0) ? ratingFunction(product) :
            <div className="text-center pt-1 pb-3 font-weight-bold">No Rating Yet</div>
          }
      
      <Card
        style={{ width: 320, height:320 }}
        cover={<img alt="example" style={{ width: 320, height:320 }}src={images.length ? images[0].url : noimage} />}
        actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined key="setting" className="text-danger"/><br/>View Product
        </Link>,
        <Tooltip title={tooltip}>
          <a href onClick={handleCart} disabled={product.quantity<1}>
            <ShoppingCartOutlined className={product.quantity>1 ? "text-danger": "text-secondary"}/><br/>
            {product.quantity<1 ? "Out of Stock": "Add to Cart"}
          </a>
        </Tooltip>,
    ]}
      >
      
        <Meta title={`${title} - ${price}`} description={`${description.substring(0,40)}....`} />
      </Card>,
      </div>
    </>
   );
}
 
export default ProductCard;
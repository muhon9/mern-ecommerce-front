import React,{useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Link } from 'react-router-dom'
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined , ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import noimage from '../../images/noimage.png';
import ProductDetailsList from './ProductDetailsList';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modals/RatingModals';
import { ratingFunction } from '../../functions/ratingFunction'
import _, { isEqual } from 'lodash';


const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({product, handleStar, star, setStar}) => {

  const { images, title, slug, description, _id, rating} = product;
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
      <div className="col-md-7">
      { images && images.length ? 
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((image)=><img alt="ecom" src={image.url} key={image.public_id} />)}
        </Carousel> : 
        <Card
          
          cover={<img alt="example" src={noimage} className="mb-3 card-image"/>}
        ></Card>}

        <Tabs type="card">
          <TabPane tab="Descriptions" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call Us at xxxxxxxxxxxxxxx
          </TabPane>
        </Tabs>


      </div>
     
      <div className="col-md-5">
        <h1 className="p-3 bg-info">{title}</h1>
        { (rating && rating.length>0) ? ratingFunction(product) :
          <div className="text-center pt-1 pb-3 font-weight-bold">No Rating Yet</div>
         }
       
        <Card
          style={{  height:320 }}
          
          actions={[
          <Link to={`/product/${slug}`}>
            <HeartOutlined key="setting" className="text-danger"/><br/>Add to Wishlist
          </Link>,
          <Tooltip title={tooltip}>
          <a onClick={handleCart}>
            <ShoppingCartOutlined className="text-danger"/><br/>Add to Cart
          </a>
        </Tooltip>,
          <RatingModal handleStar={handleStar}>
            <StarRatings 
              rating={star}
              name= {_id}
              starRatedColor="red"
              changeRating={handleStar}
              numberOfStars={5}
              isSelectable={true}
            />
          </RatingModal>
        ]}
        >
        
          <Meta description={description} />
          <ProductDetailsList product={product}/>

        </Card>,
      </div>

      
    </>
   );
}
 
export default SingleProductCard;
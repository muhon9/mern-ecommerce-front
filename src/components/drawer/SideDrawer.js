import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Drawer, Button } from 'antd';
import {Link} from 'react-router-dom';

const SideDrawer = () => {

  const { drawer, cart } = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  
  return (
    <div>
      <Drawer
        title="Cart"
        placement="right"
        
        onClose={()=>{dispatch({
          type: "SET_VISIBLE",
          payloads: false
        })}}
        visible={drawer}
      >
        <h6>{cart.length} {cart.length < 2 ? "item": "items" } added to cart</h6>
        <hr/>
        {cart.map((p)=>(
          <div>
            
            <img alt="" style={{width: "150px", height: "50px"}} src={p.images.length ? p.images[0].url: "No Image"}>
            </img>
            <h6>{p.title}--- ${p.price}</h6>
         
            <hr className="text-info"/>
          </div>
        ))}
        <div>
          <Link to="/cart"><button onClick={()=>{dispatch({
          type: "SET_VISIBLE",
          payloads: false
        })}} className="btn btn-outline-info justify">Go to Cart</button></Link>
        </div>
        
      </Drawer>
    </div>
  );
}

export default SideDrawer;

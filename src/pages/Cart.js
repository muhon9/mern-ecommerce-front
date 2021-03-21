import React,{useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import ProductCardCheckOut from '../components/cards/ProductCardCheckOut';
import { userCart } from '../functions/userFunctions';


const Cart = ({history}) => {
  const { user, cart} = useSelector((state)=>({...state}));
  console.log("Process Env---", process.env);
  const gettotal = () => {
    return cart.reduce((currentValue, nextValue)=>{
      return currentValue + nextValue.count* nextValue.price
    },0)
  }

  const saveCartToDB = () => {
    
    userCart(cart, user.token)
      .then((res)=>{
        
        //console.log("res", res);
        if(res.data.ok){
          history.push("/user/checkout");
        }
      }).catch((err)=>{
        console.log("Saving Cart to DB failed", err);
        
    })

    
  }

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p)=>(
        <ProductCardCheckOut key={p._id} product={p}/>
      ))}
    </table>
  )
  
  return (
    <div className="container-fluid pt-3">
      <div className="row pl-3">
        <h4>{cart.length} Products in Cart</h4>
      </div>
      
      <div className="row">
        <div className="col-md-8">
          { !cart.length ? <h6>No Product in the cart <Link to="/shop">Continue Shopping</Link></h6>:
            showCartItems()}
        </div>
        <div className="col-md-4 text-left">
          <h4>Order Summary</h4>
          <hr/>
          {cart.length && cart.map((p, i)=>(
            <div key={i}>
              <p>{p.title} X {p.count} = ${p.price*p.count}</p>
            </div>  
          ))}
          <hr/>
          <div>Total    ${gettotal()}</div>
          <br/>
          {user ? 
            (<button 
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={saveCartToDB}
              disabled={!cart.length}>
              Proceed to checkout
            </button>):
            (<button className="btn btn-sm btn-outline-primary">
              <Link to={
                    {
                      pathname:"/login",
                      state:{from: "cart"}
                    }
                 }>Login to Checkout
              </Link>
            </button>)}
        </div>
      </div>
    </div>
  );
}

export default Cart;

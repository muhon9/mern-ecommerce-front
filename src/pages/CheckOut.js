import React,{ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUserCart, getCart, updateAddress } from '../functions/userFunctions';
import { toast } from 'react-toastify';
import { currentUser } from '../functions/authFunctions';
import { applyCoupon } from '../functions/couponFunctions';

const CheckOut = ({history}) => {
  const { user } = useSelector((state)=>({...state}));
  const [products, setProducts]= useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [ totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [ discountError,setDiscountError ] = useState("");

  const dispatch = useDispatch();

  useEffect(()=>{
    getCart(user.token)
      .then((res)=>{
        setProducts(res.data.products);
        setTotal(res.data.total);
        //console.log("Cart Data", JSON.stringify(res.data, null, 4));
        
      }).catch((err)=>{
        console.log("Cart Fetch Error");
      })
  },[])

  useEffect(()=>{
    currentUser(user.token)
      .then((res)=>{
        setAddress(res.data.address);
        
      })
  },[])

  const emptyCart = () => {
    // remove from localStorage
      if(typeof window != undefined){
        localStorage.removeItem("cart");
      }
    // remove from redux
      dispatch({
        type: "ADD_TO_CART",
        payloads: [],
      });
    // remove from DB
    
      emptyUserCart(user.token)
        .then((res)=>{
          setProducts([]);
          setTotal(0);
          setTotalAfterDiscount("");
          toast.success("Cart clear. Browse to add new products");
        })
        
  }

    
  const addressSubmit = (e) => {
    e.preventDefault();
    updateAddress(address, user.token)
      .then((res)=>{
        setAddressSaved(true);
        toast.success("Address Saved Succesfully");
      })
  }

  const handleCoupon = (e) => {
    e.preventDefault();
    //console.log("coupon submited")
    applyCoupon(coupon, user.token)
      .then((res)=>{
        console.log("coupon executed", res.data);
        if(res.data.error){
          setDiscountError(res.data.error);
          setTotalAfterDiscount("");
          dispatch({
            type: "COUPON_APPLIED",
            payloads: false
          })
        }else{
          setTotalAfterDiscount(res.data);
          dispatch({
            type: "COUPON_APPLIED",
            payloads: true
          })
        }
      })
  }

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6 text-left">
          <div>
            <h4>Delivery Info</h4>
            <hr/>
            <h6>Add Your Delivery Address</h6>
           
            <form onSubmit={addressSubmit} className="form-group">
              <textarea onFocus className="form-control" value={address} onChange={(e)=> setAddress(e.target.value)}></textarea>
              <br/>
              <button type="submit" className="btn btn-info" >Save</button>  
            </form>
            
            
            <br/>
            <br/>
            <br/>
          </div>
          <div>
            <h6>Have a Coupon?</h6>
            <form className="form-group" onSubmit={handleCoupon}>
              <input className="form-control" value={coupon} onChange={(e)=> {
                setCoupon(e.target.value);
                setDiscountError("");
              }}></input>
              <br/>
              <button type="submit" className="btn btn-info">Submit</button>
            </form>
            {discountError && (<div className="bg-danger">{discountError}</div>)}
          </div>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr/>
          {products.map((p,i)=>(
            <div key={i}>
              <h6>{p.product.title}-({p.color}) X {p.count} = ${p.price* p.count}</h6> 
            </div>
          ))}
          <hr/>
          <h5>Total ${total}</h5>
          <br/>
          {totalAfterDiscount && (<div className="bg-info p-3"><h6>Coupon Executed. You have to pay ${totalAfterDiscount} after discount</h6></div>)}
          <br/>
          <div>
            <button className="btn btn-outline-primary" disabled={!addressSaved || !products.length} onClick={()=>history.push("/user/payment")} >Confirm Order</button>
            <button className="btn btn-outline-primary ml-5" disabled={!products.length} onClick={emptyCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;

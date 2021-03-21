import React from 'react';
import {useSelector, useDispatch}  from 'react-redux';
import ModalImage from "react-modal-image";
import noimage from '../../images/noimage.png';
import {toast} from 'react-toastify'
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'


const ProductCardCheckOut = ({product}) => {

  const colors= ["Black","Red","White","Blue","Silver"];
  //const {cart} = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  const handleCountChange = (e) => {
    var count;
    if(product.quantity<e.target.value){
      toast.error("No more product in stock");
      return;
    }

    if(e.target.value<1){
      count =1;
    }else{
      count= e.target.value;
    }

    var cart =[];
    if(typeof window != "undefined"){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((p, i)=>{
      if(p._id === product._id){
        cart[i].count = count;
      }
        
  })
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payloads: cart,
    })
  }

  

  const handleColorChange = (e) => {
    var cart =[];
    if(typeof window != "undefined"){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((p, i)=>{
      if(p._id === product._id){
        cart[i].color = e.target.value;
        
      }  
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payloads: cart,
    })
  }

  const handleRemove = (e) => {
    var cart =[];
    if(typeof window != "undefined"){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((p, i)=>{
      if(p._id === product._id){
        cart.splice(i, 1);
        
      }  
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payloads: cart,
    })
  }

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width:"50px", height:"auto"}}>
            {product.images.length ? 
            (<ModalImage 
              small={product.images[0].url}
              large={product.images[0].url}></ModalImage>):
              (<ModalImage 
              small={noimage}
              large={noimage}></ModalImage>)}
          </div>
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select onChange={handleColorChange}  className="form-control">
            { product.color ? <option >{product.color}</option>: <option>Select..</option>  }
            {colors.filter((c)=>c !== product.color).map((c)=>(
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </td>
        <td>
          <input value={product.count} onChange={handleCountChange} style={{width: "80px"}} className="form-control" type="number">
              
          </input>
        </td>
        <td>
            {product.shipping==="Yes" ? (<CheckCircleOutlined className="text-success" />):(<CloseCircleOutlined className="text-danger"/>)}
        </td>
        <td>
          <CloseOutlined 
            className="text-danger pointer"
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default ProductCardCheckOut;

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { createCoupon, getCoupon, removeCoupon } from '../../functions/couponFunctions';



const Coupon = () => {
  const { user } = useSelector(state=>({...state}))
  const [ name, setName] = useState('');
  const [ discount, setDiscount ] = useState(0);
  const [ expiry, setExpiry ] = useState(new Date());
  const [ coupons, setCoupons ] = useState([]);


  useEffect(()=>{
    loadCoupons();
  },[])

  
  const loadCoupons = () => {
    getCoupon()
      .then((res)=>{
        setCoupons(res.data);
      }).catch((err)=>{
        console.log("Coupon Load Error");
      })
  }
  
  const couponSubmit = (e) => {
    e.preventDefault();
    //console.log("Coupon submited")
    createCoupon({name, discount, expiry}, user.token)
      .then((res)=>{
        loadCoupons();
        toast.success(`Coupon ${res.data.name} is saved`);
        setName('');
        setDiscount(0);
        setExpiry(new Date());
      }).catch((err)=>{
        toast.error("Coupon Didn't save");
        console.log("Error", err);
      })
  }

  const deleteCoupon = (couponId) => {
    console.log("Remove Clicked", couponId);
    removeCoupon(couponId, user.token)
      .then((res)=>{
        toast.success("Coupon Deleted");
        loadCoupons();
      }).catch((err)=>{
        toast.error("Couldn't Delete the Coupon");
      })
  }

  return ( 
    <div className="container-fluid">
       <div className="row">
        <div className="col-md-2">
          <nav className="float-left">
            <AdminNav />
          </nav>
        </div>
        
        <div className="col-md-9 pt-5">
          <div className="text-left">
          <h4>Add Coupons</h4>
            <form onSubmit={couponSubmit}>
              <div className="form-group">
                <label className="pt-2">Name:</label>
                <input required autoFocus className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
                <label className="pt-2">Discount:</label>
                <input required type="number" value={discount} className="form-control" onChange={(e)=> setDiscount(e.target.value)}/>
                <label className="pt-2">Expiry:</label>
                <br/>
                <DatePicker selected={expiry} onChange={date => setExpiry(date)} />
                <br/>
                <br/>
                <button type="submit" className="btn btn-outline-info">Save</button>
              </div>
            </form>
          </div>
          <div>
            <h4>{coupons.length} {coupons.length>1 ? "coupons": "coupon"} running</h4>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr className="">
                  <th scope="col">Name</th>
                  <th scope="col">Discount(%)</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length && coupons.map((c)=>(
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.discount}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td><DeleteOutlined onClick={()=>deleteCoupon(c._id)} className="text-danger pointer"/></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            <br/>
            <br/>
          
        </div>  


        </div>

        
     </div>
    </div>
  );
}
export default Coupon;
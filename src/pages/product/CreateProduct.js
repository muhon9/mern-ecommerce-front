import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../components/AdminNav'
import { createProduct } from '../../functions/productFunction';
import { toast } from 'react-toastify'
import { getCategories, getOptionSubs } from '../../functions/categoryFunctions';
import { getSubs } from '../../functions/subFunctions';
import { Select } from 'antd'
import FileUpload from '../../components/forms/FileUpload';

const { Option } = Select;


const initialStates = {
  title:'Mac Book 120',
  description:'Best Product Best Product Best ProductBest Product Best Product Best Product Best Product',
  price: '4500',
  categories:[],
  category: '5ff8da08bf09aa04146a72e0',
  subs: [],
  quantity: '20',
  images: [],
  colors:  ["Black","Red","White","Blue","Silver"],
  brands: ["Apple","Samsung","ASUS","MSI","Lenovo"],
  color: '',
  brand: '',
}

const CreateProduct = () => {

  const { user } = useSelector((state)=>({...state}))

  const [ values, setValues ] = useState(initialStates);
  const [ loading , setLoading ] = useState(false);
  const { title, description, price, categories, category, subs, quantity,images,colors, color, brands, brand} = values;
  const [ subOptions, setSubOptions ] = useState([]);
  const [showSubs, setShowSubs] = useState(false);

  useEffect(()=>{
    //console.log("this is user",user);
    loadSubs();
    loadCategories();
  },[])

  const loadSubs = () =>{
    getSubs()
      .then((res)=>{
        setValues({...values, subs: res.data});
      })
  }

  const loadCategories = () =>{
    getCategories()
      .then((res)=>{
        setValues({...values, categories: res.data});
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res)=>{
        if(window.confirm(`${res.data.title} created`)){
          window.location.reload();
        };
        console.log(res.data);
      })
      .catch((err)=>{
        toast.error(err.response.data.err);
        console.log("the eroor",err.response);
      })
  }

  const handleSubOptions = (e) => {
    e.preventDefault();
    
    getOptionSubs(e.target.value)
      .then((res)=>{
          console.log("Trigered", e.target.value);
          setSubOptions(res.data);
          setValues({...values,subs:[], [e.target.name]: e.target.value})
          setShowSubs(true);
      })
      
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return ( 
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          
          <h3>Product Create</h3>
          
          <br/>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="float-left ">Title: </label>
              <input 
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="float-left ">Description: </label>
              <input 
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="float-left ">Price: </label>
              <input 
                type="number"
                className="form-control"
                name="price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <FileUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading}/>
            </div>
              <br/>
              <br/>
              <br/>
             <div className="form-group">
              <label className="float-left ">Categoy: </label>
              <select className="form-control"
                name="category"
                onChange={handleSubOptions}>
                <option >--Select Category--</option>
                { categories.length>1 && categories.map((category)=>(
                <option  key={category._id} value={category._id}>{category.name}</option>
            ))}
              </select>
            </div> 
            
            {showSubs && <div className="form-group">
              <label className="float-left ">Sub category: </label>
              <Select className="form-control"
                mode="multiple"
                value={subs}
                placeholder="Please Select"
                onChange={value=>setValues({...values, subs:value})}>
                
                { subOptions.length>0 && subOptions.map((sub)=>(
                <Option  key={sub._id} value={sub._id}>{sub.name}</Option>
            ))}
              </Select>
            </div> }
            <div className="form-group">
              <label className="float-left ">Quantity: </label>
              <input 
                type="number"
                className="form-control"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="float-left ">Shipping: </label>
              <select className="form-control"
                name="shipping"
                onChange={handleChange}>
                <option >--Select Shipping--</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="float-left ">Color: </label>
              <select className="form-control"
                name="color"
                onChange={handleChange}>
                <option >--Select Color--</option>
                { colors.map((c)=>(
                  <option value={c}>{c}</option>
                ))}               
              </select>
            </div>
            <div className="form-group">
              <label className="float-left ">Brand: </label>
              <select className="form-control"
                name="brand"
                onChange={handleChange}>
                <option >--Select Brand--</option>
                { brands.map((b)=>(
                  <option value={b}>{b}</option>
                ))}               
              </select>
            </div>
            <button disabled={loading} type="submit" className="btn btn-outline-primary float-lg-left mb-3"> Save </button>
          </form>
        </div>
      </div>
    </div>
   );
}
 
export default CreateProduct;
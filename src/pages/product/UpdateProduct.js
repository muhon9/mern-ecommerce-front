import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../components/AdminNav'
import { createProduct, getProduct, updateProduct } from '../../functions/productFunction';
import { toast } from 'react-toastify'
import { getCategories, getOptionSubs } from '../../functions/categoryFunctions';
import { getSubs } from '../../functions/subFunctions';
import { Select } from 'antd'
import FileUpload from '../../components/forms/FileUpload';

const { Option } = Select;


const initialStates = {
  title:'',
  description:'',
  price: '',
  shipping: '',
  category: '',
  subs: [],
  quantity: '',
  images: [],
  colors:  ["Black","Red","White","Blue","Silver"],
  brands: ["Apple","Samsung","ASUS","MSI","Lenovo"],
  color: '',
  brand: '',
}

const UpdateProduct = ({match, history}) => {

  const { user } = useSelector((state)=>({...state}))

  const [ values, setValues ] = useState(initialStates);
  const [ loading , setLoading ] = useState(false);
  const { title, description, price, category, subs, shipping,quantity,images,colors, color, brands, brand} = values;
  const [ subArray, setSubArray ] = useState([]);
  const [currentCategory, setCurrentCategory]= useState();
  const [currentSubs, setCurrentSubs] = useState([]);
  const [ categories, setCategories] = useState([]);
  const [ subOptions, setSubOptions ] = useState([]);
  
  const { slug } = match.params;

  useEffect(()=>{
    //console.log("this is user",user);
    loadProduct();
    loadCategories();
  },[])

  const loadProduct = () => {
    setLoading(true);
    getProduct(slug)
    .then((res)=>{
      setValues({...values, ...res.data});
      setCurrentCategory(res.data.category);
      //let currentSubs = res.data.subs;
      let currentSubs =res.data.subs;
      console.log("data ",res.data.subs);
      console.log("crnt subs",currentSubs);
      let sArray = [];
      
      currentSubs.map((s)=>(
        sArray.push(s._id)
        ))
        
      
      setSubArray((prev)=>sArray);
      console.log(subArray);
      getOptionSubs(res.data.category._id)
      .then((res)=>{
           setLoading(false);
           setSubOptions(res.data);
         }  
      ) 

    })
  }



  const loadCategories = () =>{
    setLoading(true);
    getCategories()
      .then((res)=>{
        //setLoading(false);
        console.log("this is Load Category");
        setCategories(res.data);
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, subs: subArray});
    updateProduct( slug ,values, user.token)
      .then((res)=>{
        if(window.confirm(`${res.data.title} created`)){
          history.push('/admin/products');
        };
        console.log(res.data);
      })
      .catch((err)=>{
        toast.error("Coun't eidt");
        console.log("the eroor",err.response);
      })
  }

  const handleSubOptions = (e) => {
    e.preventDefault();
    setSubArray([]);
    // if(e.target.value=== currentCategory){
    //   setSubArray(currentSubs);
    // }
    // else{
    //   setSubArray([]);
    // }
    setValues({...values, subs:[], [e.target.name]: e.target.value})
    getOptionSubs(e.target.value)
      .then((res)=>{
          console.log("Trigered", e.target.value);
          
          setSubOptions(res.data);
      })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
    
  }


  const handleSubChange = (value) => {
    setSubArray(value);
    setValues({...values, subs: value});
  }

  return ( 
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav />
        </div>
         
        <div className="col-md-10">
          {loading ? (<div>Loading.....</div>):(<h3>Product Create</h3>) }
          {JSON.stringify(values)}
          
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
            {JSON.stringify(subOptions)}
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
            {JSON.stringify(subArray)}
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
                { categories.length>0 && categories.map((c)=>(
                <option selected={category._id===c._id} key={c._id} value={c._id}>{c.name}</option>
            ))}
              </select>
            </div> 
            
            <div className="form-group">
              <label className="float-left ">Sub category: </label>
              <Select className="form-control"
                mode="multiple"
                value={subArray}
                placeholder="Please Select"
                onChange={handleSubChange}>
                
                { subOptions.length>0 && subOptions.map((sub)=>(
                <Option  key={sub._id} value={sub._id}>{sub.name}</Option>
            ))}
              </Select>
            </div> 
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
                value={shipping}
                onChange={handleChange}>
                
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="float-left ">Color: </label>
              <select className="form-control"
                name="color"
                onChange={handleChange}>
                value={color}
                { colors.map((c)=>(
                  <option value={c}>{c}</option>
                ))}               
              </select>
            </div>
            <div className="form-group">
              <label className="float-left ">Brand: </label>
              <select className="form-control"
                name="brand"
                value={brand}
                onChange={handleChange}>
                
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
 
export default UpdateProduct;
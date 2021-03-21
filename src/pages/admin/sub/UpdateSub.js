import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { updateCategory, getCategory, getCategories } from '../../../functions/categoryFunctions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getsub, updatesub } from '../../../functions/subFunctions';



const UpdateSub = ({history,match}) => {
  const { user } = useSelector(state=>({...state}))
  const [ name, setName] = useState('');
  const [ category, setCategory] = useState('');
  const [ categories, setCategories] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ parent, setParent] = useState("");

  useEffect(()=>{
    //console.log("this is match",match);
    loadSub();
    loadCategories();
    //console.log("this is category", category);
  },[])

  
  const loadSub = () =>{
    getsub(match.params.slug)
      .then((res)=>{
        setName(res.data.sub.name);
        setParent(res.data.sub.parent);
        setCategory(res.data);
        console.log("this is category", category);
      })
  }

  

  const loadCategories = () =>{
    getCategories()
      .then((res)=>{
        setCategories(res.data);
        console.log("this is category", category);
      })
  }

  

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    updatesub(match.params.slug, {name, parent}, user.token)
      .then((res)=>{
        toast.success(`Sub updated to ${res.data.name}`)
        setLoading(false);
        history.push('/admin/subcategory');
      })
      .catch((err)=>{
        toast.error(err.response.data);
        setLoading(false);
      })
  }
  const editForm = ()=>(
    <form onSubmit={handleSubmit}>
      <div className="form-group ">
        
        <input 
          type="text"
          className="form-control" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          autoFocus
          required
        />
        <br/>
        
        <div className="form-group col-lg-4">
          <label>Parent</label>
          <select className="form-control" onChange={e=>setParent(e.target.value)}>
              {/* <option value={selected._id}>{selected.name}</option> */}
              
            { categories.length>1 && categories.map((category)=>(
              <option key={category._id} value={category._id} selected={category._id===parent}>{category.name}</option>
            ))}
          </select>
          
        </div>
        
        <button type="submit" className="btn btn-outline-primary float-left">Update</button>
      </div>
    </form>
  )

  return ( 
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <nav className="float-left">
            <AdminNav />
          </nav>
        </div>
      
      <div className="col">
        <h3>Update the subcategory</h3>
        {editForm()}
      </div>
    </div>
  </div>
   );
}
 
export default UpdateSub;
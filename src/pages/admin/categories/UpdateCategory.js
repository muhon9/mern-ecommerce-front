import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { updateCategory, getCategory } from '../../../functions/categoryFunctions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'



const UpdateCategory = ({history,match}) => {
  const { user } = useSelector(state=>({...state}))
  const [ name, setName] = useState('');
  const [ category, setCategory] = useState('');
  const [ loading, setLoading] = useState(false);

  useEffect(()=>{
    //console.log("this is match",match);
    loadCategory();
    //console.log("this is category", category);
  },[])

  
  const loadCategory = () =>{
    getCategory(match.params.slug)
      .then((res)=>{
        setCategory(res.data.category.name);
        
      })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, category, user.token)
      .then((res)=>{
        toast.success(`Category updated to ${res.data.name}`)
        setLoading(false);
        history.push('/admin/category');
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
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          autoFocus
          required
        />
        <br/>
        <button type="submit" className="btn btn-outline-primary">Update</button>
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
        <h3>Update the Category</h3>
        {editForm()}
      </div>
    </div>
  </div>
   );
}
 
export default UpdateCategory;
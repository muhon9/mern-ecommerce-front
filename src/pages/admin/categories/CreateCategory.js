import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { creatCategory, deleteCategory, getCategories, updateCategory } from '../../../functions/categoryFunctions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';



const CreateCategory = () => {
  const { user } = useSelector(state=>({...state}))
  const [ name, setName] = useState('');
  const [ categories, setCategories] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ keyword, setKeyword ] = useState('');


  useEffect(()=>{
    //console.log("this is user",user);
    loadCategories();
  },[])

  const loadCategories = () =>{
    getCategories()
      .then((res)=>{
        setCategories(res.data);
      })
  }

  const handleDelete = async(slug)=>{
    setLoading(true);
    if(window.confirm("Delete?")){
      deleteCategory(slug,user.token)
        .then((res)=>{
          toast.error(`${res.data.name} is deleted`);
          loadCategories();
        }).catch((err)=>{
          toast.error(err.response.data);
          //console.log(err.data);
          setLoading(false);
        })
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    creatCategory(name, user.token)
      .then((res)=>{
        toast.success(`${res.data.name} category is created`);
        setLoading(false);
        setName('');
        loadCategories();
      }
    ).catch((err)=>{
      toast.error(err.response.data);
      console.log(err.data);
      setLoading(false);
    })
  }

  const categoryForm = ()=>(
    <form onSubmit={handleSubmit}>
      <div className="form-group ">
        <label>Name:</label>
        <input 
          type="text"
          className="form-control" 
          onChange={(e)=>setName(e.target.value)}
          placeholder="Add a category"
          value={name}
          autoFocus
          required
        />
        <br/>
        <button type="submit" className="btn btn-outline-primary"  >Save</button>
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
        <h3>Add a Category</h3>
        {categoryForm()}
        
        <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
        
        { categories.filter(c=>c.name.toLowerCase().includes(keyword)).map((category)=>{
          return (
            <div className="alert alert-primary text-left" key={category._id}>{category.name}
              <div className="float-right">
                <span className="btn btn-sm"><Link to={`/admin/category/${category.slug}`}><EditOutlined className="text-danger"/></Link></span>
                <span onClick={()=>handleDelete(category.slug)} className="btn btn-sm"><DeleteOutlined className="text-danger"/></span>
              </div>
            </div>) 
        })}
      </div>
    </div>
    </div>
  );
}
export default CreateCategory;
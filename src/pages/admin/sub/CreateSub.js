import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { getCategories } from '../../../functions/categoryFunctions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';
import { creatsub, deletesub, getSubs } from '../../../functions/subFunctions';



const CreateSub = () => {
  const { user } = useSelector(state=>({...state}))
  const [ name, setName] = useState('');
  const [ categories, setCategories] = useState([]);
  const [ subs, setSubs] = useState([]);
  const [ parent, setParent] = useState("");
  const [ loading, setLoading] = useState(false);
  const [ keyword, setKeyword ] = useState('');


  useEffect(()=>{
    //console.log("this is user",user);
    loadSubs();
    loadCategories();
  },[])

  const loadSubs = () =>{
    getSubs()
      .then((res)=>{
        setSubs(res.data);
      })
  }

  const loadCategories = () =>{
    getCategories()
      .then((res)=>{
        setCategories(res.data);
      })
  }

  const handleDelete = async(slug)=>{
    setLoading(true);
    if(window.confirm("Delete?")){
      deletesub(slug,user.token)
        .then((res)=>{
          toast.error(`${res.data.name} is deleted`);
          loadSubs();
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
    creatsub({name, parent}, user.token)
      .then((res)=>{
        toast.success(`${res.data.name} sub is created`);
        setLoading(false);
        setName('');
        loadSubs();
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
        <label>Sub Name:</label>
        <input 
          type="text"
          className="form-control" 
          onChange={(e)=>setName(e.target.value)}
          placeholder="Add a Sub"
          value={name}
          autoFocus
          required
        />
        <br/>
        <div className="form-group col-lg-4 inline-block">
          <label>Parent</label>
          <select className="form-control" onChange={e=>setParent(e.target.value)}>
              <option>--Select The Category</option>
            { categories.length>1 && categories.map((category)=>(
              <option  key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <br/>
        <button type="submit" className="btn btn-outline-primary float-lg-left mb-3"  >Save</button>
        <br/>
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
        <h3>Add a Subcategory</h3>
        {categoryForm()}
        
        <LocalSearch  keyword={keyword} setKeyword={setKeyword}/>
        
        { subs.filter(c=>c.name.toLowerCase().includes(keyword)).map((sub)=>{
          return (
            <div className="alert alert-primary text-left" key={sub._id}>{sub.name}
              <div className="float-right">
                <span className="btn btn-sm"><Link to={`/admin/subcategory/${sub.slug}`}><EditOutlined className="text-danger"/></Link></span>
                <span onClick={()=>handleDelete(sub.slug)} className="btn btn-sm"><DeleteOutlined className="text-danger"/></span>
              </div>
            </div>) 
        })}
      </div>
    </div>
    </div>
  );
}
export default CreateSub;
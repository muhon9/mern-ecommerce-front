import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'


const SearchFilter = () => {

  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { query } = useSelector((state)=>({...state}))
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    history.push(`/shop`);
    setSearch(e.target.value);
  }

  const handleChange = (e)=>{
    setSearch(e.target.value);
    console.log("query", e.target.value)
    dispatch({type: "QUERY", payloads: {text:e.target.value}})
  }

  return ( 
    <div className="float-right">
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input className="form-control mr-sm-2" value={query.text} type="text" placeholder="Search" onChange={handleChange} />
        <SearchOutlined onClick={handleSubmit}/>
      </form>
    </div>
    
   );

}
 
export default SearchFilter;
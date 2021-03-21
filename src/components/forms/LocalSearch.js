import React from 'react';

const LocalSearch = ({keyword, setKeyword}) => {

  const handleSearch = (e) =>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return ( 
    <div>
      <input 
          type="text" 
          placeholder="Filter" 
          onChange={handleSearch}
          value={keyword} 
          className="form-control mb-3"
        />
    </div>
   );
}
 
export default LocalSearch;
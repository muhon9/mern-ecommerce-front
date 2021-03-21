import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {Avatar, Badge } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';



const FileUpload = ({values, setValues,loading, setLoading}) => {

  const { user } = useSelector((state)=>({...state}))
  

  const handleImageUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    let files = e.target.files;
    let addedImages = values.images;
    if(files){
      for (let i = 0; i < files.length; i++) {
        
        Resizer.imageFileResizer(files[i], 520, 520, 'JPEG', 50, 0,
          (uri) => {
            console.log(uri);
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri},{
              headers:{
                authToken:user.token,
              }
            })
              .then((res)=>{
                console.log("THis is resposes", res.data);
                addedImages.push(res.data);
                setValues({ ...values , images: addedImages });
                setLoading(false);
              })
              .catch((err)=>{
                console.log(err.message);
              })
            },
        'base64'
        );   
      }
    }
  }

  const handleImageRemove = (public_id) => {
    //console.log(public_id);
    //setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
      headers:{
        authToken: user.token,
      }
    })
      .then((res)=>{
        //setLoading(false);
        //console.log("triggered", res);
        let { images } = values;
        let filteredImages = images.filter((image)=>{
          return image.public_id !== public_id;
        })
        setValues({...values, images: filteredImages});

      })
      .catch((err)=>{
        console.log("Couldn't remove the image", err);
      })
  }

  return ( 

    <>
    
      <div className="row">
        
        { loading ? (<div><LoadingOutlined style={{height:"50px", width:"50px"}} className="text-danger"/></div>): (values.images && values.images.map((image)=>(
          <Badge 
            count="x" 
            key={image.public_id}
            style={ {cursor:"pointer"}}
            onClick={()=>handleImageRemove(image.public_id)}
            >
              <Avatar 
                key={image.public_id} 
                src={image.url} 
                size={100} 
                shape="square"
                className="ml-2"
              />
          </Badge>
          
        )))
          
          }

      </div>

      <div className="mt-3">
      
        <label className="btn btn-outline-primary float-left"> Upload Images
          <input 
            type="file"
            multiple
            hidden
            accept="imeges/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </>
    
   );
}
 
export default FileUpload;
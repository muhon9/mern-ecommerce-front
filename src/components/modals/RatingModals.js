import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import { useHistory, useParams} from 'react-router-dom';
import { Modal, Button } from 'antd';
import { StarOutlined } from '@ant-design/icons'

const RatingModal = ({children, handleStar}) => {
  const { user } = useSelector(state=>({...state}));
  const [ modalVisible, setModalVisible ] = useState(false);

  let history = useHistory();
  let params = useParams();

  const handleClick = () => {
    //console.log("History", history)
    if(user && user.token){
      setModalVisible(true)
    }else{
      history.push({
        pathname: "/login",
        state: { from: `/product/${params.slug}`}
      });
    }
  }

  return ( 
    <>
      <div onClick={handleClick}>
        <StarOutlined className="text-danger"/><br/>
        { user && user.token ? "Give a Rating": "Login to Rate"}
      </div>
      <Modal
        title="Give Rating"
        visible={modalVisible}
        onOk={()=>{setModalVisible(false)}
          } 
        onCancel={()=>{setModalVisible(false)}}
      >
        {children}
      </Modal>
    </>
   );
}
 
export default RatingModal;

import React from 'react';
import { Card } from 'antd';
import noimage from '../../images/noimage.png';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons'

const { Meta } = Card;


const AdminProductCards = ({ product, handleRemove }) => {

  const { title, description, images, slug} = product;

  return ( 
   
      
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" style={{ height: 250, objectFit: "cover", border: "1px solid blue" }} src={images.length ? (images[0].url) : (noimage)} />}
        actions={
          [<Link to={`/admin/product/${slug}`}><EditOutlined className="text-danger"/></Link> ,
          <DeleteOutlined 
            className="text-danger"
            onClick={()=>handleRemove(slug)}
          />]
        }
      >
        <Meta title={title} description={`${description && description.substring(0,40)}....`} />
      </Card>
   
   );

}
 
export default AdminProductCards;
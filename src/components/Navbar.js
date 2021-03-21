import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined, AppstoreOutlined, SettingOutlined ,LogoutOutlined, LoginOutlined, ShopOutlined} from '@ant-design/icons';
import { auth } from '../pages/auth/firebaseConfig';
import SearchFilter from './SearchFilter';




const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  let { user, cart } = useSelector((state)=>({...state}));
  const history = useHistory();

  const handleClick = e => {
    setCurrent(e.key);
  };

  const handleLogout = (e) =>{
    auth.signOut();
    dispatch({
      type: "LOGGED_OUT",
      payloads: null,
    })
    history.push('/login');
  }

  return ( 
    <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
         <Link to="/">Home </Link> 
        </Menu.Item>
        <Menu.Item key="shop" icon={<ShopOutlined />}>
         <Link to="/shop">Shop </Link> 
        </Menu.Item>
      <Menu.Item key="cart"  icon={<ShoppingCartOutlined />}>
        <Link to="/cart"><Badge count={cart.length} offset={[9, 1]}>Cart</Badge></Link>
        
      </Menu.Item>

      {user && (<SubMenu key="SubMenu" icon={<SettingOutlined />} title={user && user.email.split('@')[0]} className="float-right">
          <Menu.ItemGroup title="">
            {user && user.role === "admin" && (
              <Menu.Item key="setting:1"><Link to="/admin/dashboard">Dashboard</Link></Menu.Item>
            )}
            {user && user.role === "subscriber" && (
              <Menu.Item key="setting:1"><Link to="/user/history">Dashboard</Link></Menu.Item>
            )}

            
            {/* <Menu.Item key="setting:2">Option 2</Menu.Item> */}
            <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Log Out</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> )}  
        
      { !user && (
        <Menu.Item key="registration"  icon={<SettingOutlined />} className="float-right">
          <Link to="/registration">Registration</Link> 
        </Menu.Item>
      )}  
      { !user && (
        <Menu.Item key="login"  icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link> 
        </Menu.Item>
        
        
      )}
      
        <SearchFilter/>
      
      
      </Menu>
        
        
   );
}
 
export default Navbar;


import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { listProducts, queryProduct } from '../../functions/productFunction';
import ProductCards from '../../components/cards/ProductCards'
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { getCategories } from '../../functions/categoryFunctions';
import Star from '../../components/forms/Star'
import { getSubs } from '../../functions/subFunctions';

const { SubMenu } = Menu;


const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts]= useState([]);
  const [loading, setLoading]= useState(true);
  const [price, setPrice] = useState([0,0]);
  const [ok, setOk] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [shippings, setShippings] = useState(["Yes","No"]);
  const [shipping, setShipping] = useState("");
  const [brands, setBrands] = useState(["Apple","Samsung","ASUS","MSI","Lenovo"])
  const [brand, setBrand] = useState("")
  const [colors, setColors] = useState(["Black","Red","White","Blue","Silver"])
  const [color, setColor] = useState("")
  const {query}= useSelector((state)=>({...state}));
  const { text }= query;

  useEffect(()=>{
    getCategories()
      .then((res)=>{
        setCategory(res.data);
        
      })

    getSubs()
      .then((res)=>{
        setSubs(res.data);
        console.log("Subs", res.data);
      })

    if(text.length>0){
      filterProducts({query: text}); 
    }
    productLoad();
  },[])

  //helper function after appling filter
  const filterProducts = (arg) =>{
    queryProduct(arg)
      .then((res)=>{
        
        setLoading(false)
        setProducts(res.data);
        console.log("Data", res.data);
      })
  }

  //helper before appling filter
  const productLoad = ()=>{
    listProducts(12)
      .then((res)=>{
        setProducts(res.data);
        setLoading(false)
      }).catch((err)=>{
        setLoading(true)
        
      })
  }

  // use effect for query
  useEffect(()=>{
    if(text.length<1){
      productLoad();
    }
    setCategoryIds([]);
    setPrice([0,0]);
    filterProducts({query: text});
  },[text])

  //price handle
  const handlePrice = (value)=>{
    setPrice(value);
    setCategoryIds([]);
    setStar("");
    setSub("");
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setTimeout(()=>{
      setOk(!ok);
    },300)
  }

  useEffect(()=>{
    if(price[1]===0){
      productLoad();
    }else{
      filterProducts({price});
    }
  },[ok])

  //Category Checkbox list
  const categoryList = () =>(
    category.map((c)=>(
      <div key={c._id}>
        <Checkbox
        className="pb-2 pr-4 pl-4"
        value={c._id}
        name="category"
        onChange={handleCheck}
        checked={categoryIds.includes(c._id)}
      >
       {c.name}
      </Checkbox>
      </div>
      
    ))
  )

  const handleCheck =(e)=>{
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setPrice([0,0]);
    setBrand("");
    setColor("");
    setStar("");
    setSub("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let isInTheState = inTheState.indexOf(justChecked);
    if(isInTheState === -1){
      inTheState.push(e.target.value);
    }else{
      
      inTheState.splice(isInTheState,1);
    }
    setCategoryIds(inTheState);
    filterProducts({category: inTheState});
    
  }

  // star rating sorting

  const handleStarClick=(num) => {
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setCategoryIds([]);
    setPrice([0,0]);
    setStar(num);
    setSub("");
    setShipping("");
    setColor("");
    setBrand("");
    filterProducts({stars: num});
  }

  const starRating = () =>(
    <div className="pb-4 pr-4 pl-4">
      <Star starClick={handleStarClick}  numberOfStars={5}/>
      <Star starClick={handleStarClick}  numberOfStars={4}/>
      <Star starClick={handleStarClick}  numberOfStars={3}/>
      <Star starClick={handleStarClick}  numberOfStars={2}/>
      <Star starClick={handleStarClick}  numberOfStars={1}/>
    </div>
  )

  // sub category filtering

  const handleSub = (sub) => {
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setSub(sub);
    setCategoryIds([]);
    setPrice([0,0]);
    setStar("");
    setShipping("");
    setColor("");
    setBrand("");
    console.log("Target", sub);
    filterProducts({sub: sub});
  }

  const subCategoryList = () => (
    subs.map((sub)=>(
      <div style={{cursor:"pointer"}} key={sub._id} className="m-1 p-2 badge badge-secondary" onClick={()=>handleSub(sub)}>{sub.name}</div>
    ))
  )

  // shipping filtering
  const handleShipping = (e) => {
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setShipping(e.target.value);
    setSub("");
    setCategoryIds([]);
    setPrice([0,0]);
    setStar("");
    setColor("");
    setBrand("");
    filterProducts({shipping: e.target.value})
  }
  const showShippings = () => (
    shippings.map((s)=>(
      <Radio
        className="pl-1 pb-1 pr-1"
        name={s}
        value={s}
        checked={s===shipping}
        onChange={handleShipping}
      >{s}</Radio>
    ))
  )

  // brand filtering

  const handleBrand = (e) => {
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setBrand(e.target.value);
    setSub("");
    setCategoryIds([]);
    setPrice([0,0]);
    setStar("");
    setShipping("");
    setColor("");
    filterProducts({brand: e.target.value})
  }

  const showBrands = () => (
    brands.map((b)=>(
      <Radio
        className="pl-1 pb-1 pr-4"
        name={b}
        value={b}
        checked={b===brand}
        onChange={handleBrand}
      >{b}</Radio>
    ))
  )

  // colors filtering

  const handleColor = (e) => {
    dispatch({
      type: "QUERY",
      payloads:{text:""}
    })
    setColor(e.target.value);
    setSub("");
    setCategoryIds([]);
    setPrice([0,0]);
    setStar("");
    setShipping("");
    setBrand("");
    filterProducts({color: e.target.value})
  }
  const showColors = () => (
    colors.map((c)=>(
    
      <Radio
        className="pl-2 pb-2 pr-4"
        name={c}
        value={c}
        checked={c===color}
        onChange={handleColor}
      >{c}</Radio>
      
    
    ))
  )


  return ( 
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-2">
          <h4>Filter options</h4>
          {JSON.stringify(price, ok)}
          <hr/>
          <Menu
            //defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1','sub2','star',"shippings", "brands"]}
            mode="inline"
            >
            <SubMenu key="sub1" title={<span className="h6 text-justify"><DollarOutlined />Price</span>}>
              <Slider range defaultValue={price} value={price} max="1000" tipFormatter={(v)=>`$${v}`} onChange={handlePrice} />
            </SubMenu>
            <SubMenu key="sub2" title={<span className="h6"><DownSquareOutlined/>Category</span>}> 
              <div style={{height:"150px", overflow:"scroll" }}>{categoryList()}</div>
            </SubMenu>
            <SubMenu key="star" title={<span className="h6"><StarOutlined/>Star</span>}> 
              <div >{starRating()}</div>
            </SubMenu>
            <SubMenu key="subCategory" title={<span className="h6"><DownSquareOutlined/>Sub Categories</span>}> 
              <div className="pl-4">{subCategoryList()}</div>
            </SubMenu>
            <SubMenu key="shippings" title={<span className="h6"><DownSquareOutlined/>Shipping</span>}> 
              <div className="pl-4">{showShippings()}</div>
            </SubMenu>
            <SubMenu key="colors" title={<span className="h6"><DownSquareOutlined/>Colors</span>}> 
              <div className="pl-4">{showColors()}</div>
            </SubMenu>
            <SubMenu key="brands" title={<span className="h6"><DownSquareOutlined/>Brands</span>}> 
              <div className="pl-4 pb-4">{showBrands()}</div>
            </SubMenu>
          </Menu>
        </div>
        
        <div className="col-md-9">
          {loading ? <h4 className="text-danger">Loading....</h4>:<h4 className="text-danger">Products</h4>}
          {products.length <1 && <h4>No Products Found</h4>}
          <div className="row">
            {products && products.map((p)=>(
              <div key={p._id} className="col-md-4">
                <ProductCards product={p}/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
   );
}
 
export default Shop;
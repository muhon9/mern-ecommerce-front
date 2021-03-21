import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import './App.css';

// import Navbar from './components/Navbar';
// import Login from './pages/auth/Login';
// import Registration from './pages/auth/Registration';
// import RegistrationComplete from './pages/auth/RegistrationComplete';
// import Home from './pages/Home';
// import History from './pages/users/History';
// import UserProtectedRoutes from './components/routes/UserProtectedRoutes';
// import Password from './pages/users/Password';
// import Wishlist from './pages/users/Wishlist';
// import AdminProtectedRoutes from './components/routes/AdminProtectedRoutes';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CreateCategory from './pages/admin/categories/CreateCategory';
// import UpdateCategory from './pages/admin/categories/UpdateCategory';
// import CreateSub from './pages/admin/sub/CreateSub';
// import UpdateSub from './pages/admin/sub/UpdateSub';
// import CreateProduct from './pages/product/CreateProduct';
// import ListProducts from './pages/product/ListProducts';
// import UpdateProduct from './pages/product/UpdateProduct';
// import Product from './pages/Product';
// import CategoryProductHome from './pages/category/CategoryProductHome';
// import SubsCategoryHome from './pages/sub/SubsCategoryHome';
// import Shop from './pages/product/Shop';
// import Cart from './pages/Cart';
// import SideDrawer from './components/drawer/SideDrawer';
// import CheckOut from './pages/CheckOut';
// import Coupon from './pages/admin/Coupon';
// import Payment from './pages/Payment';


import { auth } from './pages/auth/firebaseConfig';
import { currentUser } from './functions/authFunctions';

// using react lazy

const Navbar = lazy(()=> import('./components/Navbar'));
const Login = lazy(()=>import('./pages/auth/Login'));
const Registration = lazy(()=>import('./pages/auth/Registration'));
const RegistrationComplete = lazy(()=>import('./pages/auth/RegistrationComplete'));
const Home = lazy(()=>import('./pages/Home'));
const History = lazy(()=>import('./pages/users/History'));
const UserProtectedRoutes = lazy(()=>import('./components/routes/UserProtectedRoutes'));
const Password = lazy(()=>import('./pages/users/Password'));
const Wishlist = lazy(()=>import('./pages/users/Wishlist'));
const AdminProtectedRoutes = lazy(()=>import('./components/routes/AdminProtectedRoutes'));
const AdminDashboard = lazy(()=>import('./pages/admin/AdminDashboard'));
const CreateCategory = lazy(()=>import('./pages/admin/categories/CreateCategory'));
const UpdateCategory = lazy(()=>import('./pages/admin/categories/UpdateCategory'));
const CreateSub = lazy(()=>import('./pages/admin/sub/CreateSub'));
const UpdateSub = lazy(()=>import('./pages/admin/sub/UpdateSub'));
const CreateProduct = lazy(()=>import('./pages/product/CreateProduct'));
const ListProducts = lazy(()=>import('./pages/product/ListProducts'));
const UpdateProduct = lazy(()=>import('./pages/product/UpdateProduct'));
const Product = lazy(()=>import('./pages/Product'));
const CategoryProductHome = lazy(()=>import('./pages/category/CategoryProductHome'));
const SubsCategoryHome = lazy(()=>import('./pages/sub/SubsCategoryHome'));
const Shop = lazy(()=>import('./pages/product/Shop'));
const Cart = lazy(()=>import('./pages/Cart'));
const SideDrawer = lazy(()=>import('./components/drawer/SideDrawer'));
const CheckOut = lazy(()=>import('./pages/CheckOut'));
const Coupon = lazy(()=>import('./pages/admin/Coupon'));
const Payment = lazy(()=>import('./pages/Payment'));


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idToken = await user.getIdTokenResult();
        
        currentUser(idToken.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payloads: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idToken.token,
              _id: res.data._id,
            }
          }
        )
        }).catch((error)=>{
          console.log("token sent error", error);
        })
        
      }
    })
    return ()=>unsubscribe();
  })
  
  

  return (
    <div className="App">
    <Suspense fallback={
      <div className="col text-center p-5">Loading.......</div>
    }>
      <Navbar />
      <ToastContainer/>
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/registration" component={Registration}></Route>
        <Route exact path="/registration/complete" component={RegistrationComplete}></Route>
        <Route exact path="/product/:slug" component={Product}></Route>
        <Route exact path="/category/:slug" component={CategoryProductHome}></Route>
        <Route exact path="/subs/:slug" component={SubsCategoryHome}></Route>
        <Route exact path="/shop" component={Shop}></Route>
        <Route exact path="/cart" component={Cart}></Route>

        <UserProtectedRoutes exact path="/user/history" component={History}/>
        <UserProtectedRoutes exact path="/user/password" component={Password}/>
        <UserProtectedRoutes exact path="/user/wishlist" component={Wishlist}/>
        <UserProtectedRoutes exact path="/user/checkout" component={CheckOut}/>
        <UserProtectedRoutes exact path="/user/payment" component={Payment}/>


        <AdminProtectedRoutes exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminProtectedRoutes exact path="/admin/category" component={CreateCategory} />
        <AdminProtectedRoutes exact path="/admin/category/:slug" component={UpdateCategory} />
        <AdminProtectedRoutes exact path="/admin/subcategory" component={CreateSub} />
        <AdminProtectedRoutes exact path="/admin/subcategory/:slug" component={UpdateSub} />
        <AdminProtectedRoutes exact path="/admin/product" component={CreateProduct} />
        <AdminProtectedRoutes exact path="/admin/products" component={ListProducts} />
        <AdminProtectedRoutes exact path="/admin/product/:slug" component={UpdateProduct} />
        <AdminProtectedRoutes exact path="/admin/coupon" component={Coupon} />
        
      </Switch>
      </Suspense>
    </div>
  );
}

export default App;

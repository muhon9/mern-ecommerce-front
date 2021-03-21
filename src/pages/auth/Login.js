import React, { useState, useEffect } from 'react';
import { useHistory , Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleAuthProvider } from './firebaseConfig';
import { toast } from 'react-toastify';
import { createOrUpdateUser } from '../../functions/authFunctions';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let { user } = useSelector((state)=>({...state}));
  


  useEffect(()=>{
    let intended = history.location.state;
    if(intended){
      return
    }else{
      if(user && user.token){
        history.push('/');
      }
    }
  },[user, history])

  const roleBasedHistory=(res)=>{
    let intended = history.location.state;

    if(intended){
      history.push(intended.from);
    }else{
      if(res.data.role==='admin'){
        history.push('/admin/dashboard');
      }else{
        history.push('/user/history');
      }
    } 
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payloads: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idTokenResult.token,
              _id: res.data._id,
            }
          }
        )
        roleBasedHistory(res);
        //history.push('/');
        }).catch((error)=>{
          console.log("token sent error", error);
        })

      
    } catch (error) {
      setLoading(false);
    
    var errorMessage = error.message;
    toast.error(errorMessage);
    }
  }

  const googleLogin = async () =>{
    auth.signInWithPopup(googleAuthProvider).then
    (async (result)=>{
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      
      createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payloads: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idTokenResult.token,
              _id: res.data._id,
            }
          }
        )
        history.push('/');
        }).catch((error)=>{
          console.log("token sent error", error);
        })
    }
  ).catch ((error)=>{
  setLoading(false);
  
  var errorMessage = error.message;
  toast.error(errorMessage);
  }
  )
}

  return ( 
    <div className="container">
      <h3 className="left-align">Login</h3>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" value={email} placeholder="Your Email" onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" value ={password} placeholder="Your Password" onChange={(e)=> setPassword(e.target.value)} /> 
      </div>
      <div className="form-group">
        <button className="btn btn-primary" type="submit" >Login</button>
      </div>
      </form>
      <button onClick={googleLogin} className="btn btn-primary white" type="submit" >Sine In With Google</button>
      { loading ? (<div className="text-danger">Loading...</div>) : null}
    </div>
  );
  
}


 
export default Login;
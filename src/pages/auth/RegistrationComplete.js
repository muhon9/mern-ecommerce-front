import React , {useState, useEffect} from 'react';
import { auth } from './firebaseConfig';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/authFunctions';

const RegistrationComplete = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    let result = window.localStorage.getItem('emailForSignIn');
    setEmail(result);
  },[email])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!email || !password){
      toast.error("Email and Password is required");
      return;
    }
    if(password.length < 6 ){
      toast.error("Password must be 6 charecter");
      return;
    }


    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      
      if(result.user.emailVerified){
        // remove the email from the local storage
        window.localStorage.removeItem('emailForSignIn');
        // get the login user idToken
        let user = auth.currentUser;
        await user.updatePassword(password);
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
        // redux store

        // redirect
        toast.success("Password Updated");
        history.push('/');

      }
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  const registrationcompleteform = () => <form  onSubmit={handleSubmit}>
    <input type="email" className="form-control" disabled required value= {email} onChange={(e)=> setEmail(e.target.value)} />
    <input type="password" className="form-control" placeholder="Give a password" required value={password} onChange={(e)=> setPassword(e.target.value)} />
    <button type= "submit" className="btn btn-primary btn-sm">Register</button>
  </form>

  return ( 
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          
          <h4>Complete the Registration</h4>
          {registrationcompleteform()}
        </div>
      </div>
    </div>
  );
}
 
export default RegistrationComplete;
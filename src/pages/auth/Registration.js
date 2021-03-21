import React , {useState} from 'react';
import { auth } from './firebaseConfig';
import { toast } from 'react-toastify';


const Registration = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) =>{
    
    e.preventDefault();
    var actionCodeSettings = {
      url: `${process.env.REACT_APP_REGISTRATION_REDIRECT_URL}`,
      handleCodeInApp: true,
    }
    
    auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      toast.success(`Email is sent to ${email}. Please check your email for further procedure`);
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    // ...
    });
  }

  const registrationform = () => <form onSubmit={handleSubmit}>
    <input type="email" className="form-control" placeholder="Give Your Email" autoFocus required value= {email} onChange={(e)=> setEmail(e.target.value)} />
    <button type= "submit" className="btn btn-primary btn-sm">Register</button>
  </form>

  return ( 
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          
          <h4>Register</h4>
          {registrationform()}
        </div>
      </div>
    </div>
  );
}
 
export default Registration;
import React, {useState} from 'react';
import UserNav from '../../components/UserNav';
import { auth } from '../auth/firebaseConfig';
import { toast } from 'react-toastify'

const Password = () => {
  const [password, setPassword]= useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    await auth.currentUser.updatePassword(password)
      .then(()=>{
        toast.success("Password Updated Successfully");
        setLoading(false);
      })
      .catch((err)=>{
        setLoading(false);
        toast.error(err.message);
      })
    //
  }

  const updatePassword = () =>(
    <form  onSubmit={ handleSubmit }>
      <div className="form-group">
        <label for="forPassword">Your Password:  </label>
        <input type="password" placeholder="Your New Password" className="form-control-sm p-1" onChange={(e)=> setPassword(e.target.value)} 
          disabled={loading}
        />
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={password.length<6 || loading }>Submit</button>
    </form>
  )

  return ( 
    <div >
      <div >
        <div className="float-left">
          <UserNav />
        </div>
        <div className="">
        <h2>Update Your Password</h2>
         {updatePassword()}
        </div>
      </div>
    </div>
   );
}
 
export default Password;
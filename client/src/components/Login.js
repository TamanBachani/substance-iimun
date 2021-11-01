import React, {useContext} from 'react'
import internContext from "../context/interns/internContext";
import AlertContext from '../context/alerts/AlertContext';
import '../stylesheets/auth.css'

const Login = () => {
  const { intern, onChange, loginIntern } =
    useContext(internContext);
  const {showAlert} = useContext(AlertContext)
  
  
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(intern)
    loginIntern(intern, showAlert)
  }


  return (
    <div className='login-page'>
<div className="auth-container">
      <form className='auth-form' onSubmit={handleLogin}>
        <p>Welcome back!</p>
        <input
            type="text"
            className='auth-name'
            placeholder="Name"
            aria-describedby="name"
            name="name"
            value={intern.name}
            onChange={onChange}
            required
            minLength={3}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className='auth-password'
            name="password"
            value={intern.password}
            onChange={onChange}
            required
            minLength={5}
          />
          <br />
        <button type="submit" className='auth-button'>Log In</button><br />
      </form>
    
      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
      </div>
    </div>
    </div>
  );
}





export default Login

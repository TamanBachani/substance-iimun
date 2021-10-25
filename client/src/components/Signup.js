import React, {useContext} from "react";
import internContext from "../context/interns/internContext";
import AlertContext from "../context/alerts/AlertContext";

const Signup = () => {
  const { intern, signUpIntern, onChange, setIntern } =
    useContext(internContext);
  const {showAlert} = useContext(AlertContext)

  
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!intern.sub_id.includes(".iimun@gmail.com")) {
      setIntern({sub_id:""})
      return showAlert("warning", "Please use your substance id only");
    }
    // console.log(intern)
    signUpIntern(intern, showAlert)
  }
  





  return (
<div className="login-page">
  <div className="auth-container">
    <form className="auth-form sign" onSubmit={handleSignUp}>
      <p className='signup-para'>Welcome to the club!</p>
      <input
        type="text"
        className="auth-name"
        placeholder="Name"
        aria-describedby="name"
        name="name"
        value={intern.name}
        onChange={onChange}
        required
        minLength={5}
      />
      <br />
      <input
        type="email"
        placeholder="Substance ID"
        className="auth-name"
        name="sub_id"
        value={intern.sub_id}
        onChange={onChange}
        required
        minLength={5}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        className="auth-password"
        name="password"
        value={intern.password}
        onChange={onChange}
        required
        minLength={5}
      />
      <br />
      <button type="submit" className="auth-button">
        Sign Up
      </button>
      <br />
    </form>

    <div className="drops">
      <div className="drop drop-1"></div>
      <div className="drop drop-2"></div>
      <div className="drop drop-3 sign-drop-3"></div>
      <div className="drop drop-4 sign-drop-4"></div>
      <div className="drop drop-5"></div>
    </div>
  </div>
</div>
  );
};

export default Signup;


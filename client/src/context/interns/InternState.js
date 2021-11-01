import {useState} from "react";
import InternContext from "./internContext";
import { Redirect } from "react-router-dom";

const InternState = (props) => {
  const blankSpaceIntern = {
    name: "",
    sub_id: "",
    role:""
  };
  const [intern, setIntern] = useState({ name: "", sub_id: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [details, setDetails] = useState(blankSpaceIntern)

  const toCapitalize = (str )=> {
    return str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }

  const onChange = (e) => {
    setIntern({ ...intern, [e.target.name]: e.target.value });
  };

  const signUpIntern = async ({ name, sub_id, password }, showAlert) => {
    const trimmedName = name.trim()
    const response = await fetch("/auth/signUp", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:trimmedName, sub_id, password})
    });
    const status = response.status
    if (status === 200) {
      setLoggedIn(true)
      const genAuth = await response.json()
      if (genAuth.intern.role === 'admin') {
        setIsAdmin(true)
      }
      const name = toCapitalize(genAuth.intern.name);
      setDetails({
        name: name,
        sub_id: genAuth.intern.sub_id,
        role: genAuth.intern.role,
      });
      localStorage.setItem("auth-token", genAuth.authToken);
      <Redirect to="/" />;
      showAlert("primary", "Signed up successfully! Welcome!");
    }
    else if (status === 400) {
      setIntern({ name: "", sub_id: "", password: "" });
      showAlert("danger", "Your account already exists")
    }
  }
  
  const loginIntern = async ({ name, password }, showAlert) => {
    const trimmedName = name.trim();
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:trimmedName,  password }),
    });
    const status = response.status;
    if (status === 200) {
      setLoggedIn(true);
      const genAuth = await response.json();
      const name = toCapitalize(genAuth.intern.name);
      setDetails({
        name: name,
        sub_id: genAuth.intern.sub_id,
        role: genAuth.intern.role,
      });
      localStorage.setItem("auth-token", genAuth.authToken);
      if (genAuth.intern.role === "admin") {
        setIsAdmin(true);
      }
      <Redirect to='/' />
      showAlert('success', 'Logged in successfully! Welcome back!')
    }
    else if (status >= 400) {
      const json = await response.json();
      if (json.error === "Password doesn't match") {
        setIntern({ name: "", sub_id: "", password: "" });
        showAlert('danger', 'Sorry, invalid credentials')
      }
      if (json.error === "Account does not exist") {
        setIntern({ name: "", sub_id: "", password: "" });
        showAlert("danger", "Sorry, account does not exist");
      }
    }
  };

  const logoutIntern = (showAlert) => {
    localStorage.removeItem("auth-token");
    setIsAdmin(false)
    setLoggedIn(false)
    setIntern({name: "",
    sub_id: "",
    password:""});
    setDetails(blankSpaceIntern);
    <Redirect to="/" />;
    showAlert("warning", "Logged out successfully! Seeya soon!");
  }

  const getInternFromAuth = async (authToken) => {
    const response = await fetch("/auth/internInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
    });
    const status = response.status;
    if (status === 200) {
      let { name, sub_id, role } = await response.json();
      if (role === 'admin') {
        setIsAdmin(true)
      }
      name = toCapitalize(name);
      setDetails({
        name: name,
        sub_id: sub_id,
        role: role,
      });
    }
  }


  const value = {
    intern,
    setIntern,
    loggedIn,
    setLoggedIn,
    onChange,
    signUpIntern,
    loginIntern,
    logoutIntern,
    getInternFromAuth,
    details,
    setDetails,
    isAdmin,
    setIsAdmin
  };
  return (
    <InternContext.Provider value={value}>
      {props.children}
    </InternContext.Provider>
  )
}


export default InternState;

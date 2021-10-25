import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, msg) => {
    setAlert({
      type,
      msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 2700);
  };
  const value = {
    alert,
    setAlert,
    showAlert,
  };
  return (
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

import React from "react";
import infinity from "../stylesheets/infinity.svg";

const Spinner = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{height: "62vh"}}>
          <img src={infinity} alt="Spinner" />
        </div>
      
    </>
  );
};

export default Spinner;

import React from 'react'

const Alert = (props) => {
  return (
    props.alert && <div>
      <div
        className={`alert alert-${props.alert.type} fade show m-0 text-center`}
        role="alert"
      >
        <strong>{props.alert.msg}</strong>
      </div>
    </div>
  );
}

export default Alert

import React from 'react'

const Alert = ({ messageError}) => {
  return (
    <div className="alert alert-danger">
      {messageError}
    </div>
  )
}

export default Alert

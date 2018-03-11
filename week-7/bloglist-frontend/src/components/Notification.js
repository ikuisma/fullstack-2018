import React from 'react'

const Notification = ({message}) => {
    if (message !== null) {
      return (
        <div>
          <h3>{message}</h3>
        </div>
      )
    } else {
      return null;
    }
  }

  export default Notification
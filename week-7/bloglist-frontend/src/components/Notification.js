import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => { 
  if (notification !== null) {
      return (
        <div>
          <h3>{notification}</h3>
        </div>
      )
    } else {
      return null;
    }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
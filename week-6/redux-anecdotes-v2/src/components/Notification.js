import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        const getNotificationDiv = () => this.props.notification === null ?
            null :
            (<div style={style}>{this.props.notification}</div>)  
        return getNotificationDiv() 
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)
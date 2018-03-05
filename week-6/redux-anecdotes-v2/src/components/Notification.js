import React from 'react'

class Notification extends React.Component {
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }
        const getNotificationDiv = () => this.props.store.getState().notification === null ?
            null :
            (<div style={style}>{this.props.store.getState().notification}</div>)  
        return getNotificationDiv() 
    }
}

export default Notification

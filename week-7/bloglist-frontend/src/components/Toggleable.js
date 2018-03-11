import React from 'react'

class Toggleable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisible = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
  
    render() {
      const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
      const showWhenVisible = {display: this.state.visible ? '' : 'none'}
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={this.toggleVisible}>{this.props.buttonLabel}</button>
          </div>
          <div  style={showWhenVisible}>
            {this.props.children}
            <button onClick={this.toggleVisible}>Cancel</button>
          </div>
        </div>
      )  
    }
}

export default Toggleable
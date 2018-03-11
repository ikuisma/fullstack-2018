import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      this.props.login(this.state.username, this.state.password)
      this.setState({ username: '', password: '' })
    } catch (exception) {
      this.props.notify('Wrong username or password!', 5)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <div>
            Käyttäjätunnus <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div>
            Salasana <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
  )}
}

const mapStateToProps = (state) => {
  return {}
}

const ConnectedLoginForm = connect(mapStateToProps, { login, notify })(LoginForm)
  
export default ConnectedLoginForm
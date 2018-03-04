import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({handleChange, handleSubmit, username, password}) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Käyttäjätunnus <input type="text" name="username" value={username} onChange={handleChange}/>
          </div>
          <div>
            Salasana <input type="password" name="password" value={password} onChange={handleChange}/>
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }
  
  LoginForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  
  export default LoginForm
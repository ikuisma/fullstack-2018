import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({username, logout}) => (
    <div>
      <Link to='/'>blogs</Link>  &nbsp;
      <Link to='/users'>users</Link>  &nbsp;
      {username} logged in.  &nbsp;
      <button onClick={logout}>Logout</button>     
    </div>
  )

  export default Menu
import React from 'react'
import { connect } from 'react-redux'

const UserView = ({user}) => {
    return !user ? null : (
      <div>
        <h3>{user.name}</h3>
        <h2> Added blogs </h2>
        <ul>{user.blogs.map((blog) => (<li key={blog._id}>{blog.title}</li>))}
        </ul>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserView = connect(mapStateToProps)(UserView) 

export default ConnectedUserView
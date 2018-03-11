import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const UserList = ({users}) => (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
)

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
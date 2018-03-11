import React from 'react'

const UserView = ({user}) => {
    return !user ? null : (
      <div>
        <h3>{user.name}</h3>
        <h2> Added blogs </h2>
        <ul>{user.blogs.map((blog) => (<li>{blog.title}</li>))}
        </ul>
      </div>
    )
}

export default UserView
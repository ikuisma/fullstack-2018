import React from 'react'
import Toggleable from './Toggleable'
import CreateForm from './CreateForm'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const BlogList = ({ blogs }) => (
    <div>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="New blog">
        <CreateForm/>
      </Toggleable>
      <ul>
        {blogs.sort((blogOne,blogTwo) => blogTwo.likes - blogOne.likes).map(blog => 
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
} 

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
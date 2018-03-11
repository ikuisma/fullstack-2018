import React from 'react'
import Toggleable from './Toggleable'
import CreateForm from './CreateForm'
import { Link } from 'react-router-dom'

const BlogList = ({blogs, addBlogToList, user}) => (
    <div>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="New blog">
        <CreateForm onSuccess={addBlogToList}/>
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

export default BlogList
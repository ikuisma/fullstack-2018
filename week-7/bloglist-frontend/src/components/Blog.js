import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {

    increaseLikes = async () => {
      let updatedBlog = this.props.blog;
      updatedBlog.likes += 1;
      updatedBlog = await blogService.update(updatedBlog);
      this.props.onUpdateBlog(updatedBlog)
    }
 
    render() {
      const blog = this.props.blog
      if (!blog) {
        return null
      } else {
        const showDelete = blog.user.username === this.props.user.username
        const deleteButton = showDelete ? <button onClick={this.props.onDeleteBlog}>delete</button> : null
        return (
          <div>
            <h2 className="blog-title"> {blog.title} {blog.author}</h2>
            <div>
              <a href={blog.url}>{blog.url}</a>
              <p>{blog.likes} likes</p>
              <button onClick={this.increaseLikes}>like</button>
              <p>Added by {blog.user === undefined ? 'Not available' : blog.user.name }</p>
              {deleteButton}
            </div>
          </div>
        )
      }
    }
  }
  
export default Blog
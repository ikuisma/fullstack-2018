import React from 'react'
import blogService from '../services/blogs'

const CommentList = ({comments}) => (
  <div>
    <ul>{comments.map((comment, index) => <li key={index}>{comment}</li>)}</ul>
  </div>
)

const CommentForm = ({onSubmit}) => (
  <form onSubmit={onSubmit}>
    <input name="comment" type="text"/><input type="submit"/>
  </form>
)

class Blog extends React.Component {

    increaseLikes = async () => {
      let updatedBlog = this.props.blog;
      updatedBlog.likes += 1;
      updatedBlog = await blogService.update(updatedBlog);
      this.props.onUpdateBlog(updatedBlog)
    }

    submitComment = async (event) => {
      event.preventDefault()
      const comment = event.target.comment.value
      event.target.comment.value = ''
      const id = this.props.blog._id
      const updatedBlog = await blogService.createComment(id, comment)
      this.props.onCreateComment(updatedBlog, comment)
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
              <h3>Comments</h3>
              <CommentForm onSubmit={this.submitComment}/>
              <CommentList comments={blog.comments}/>
            </div>
          </div>
        )
      }
    }
  }
  
export default Blog
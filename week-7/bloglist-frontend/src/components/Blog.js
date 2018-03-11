import React from 'react'
import { connect } from 'react-redux'
import { increaseLikes, createComment, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

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

    onClickLikes = async () => {
      await this.props.increaseLikes(this.props.blog)
      this.props.notify(`Voted for blog '${this.props.blog.title}'!`, 5)
    }

    submitComment = async (event) => {
      event.preventDefault()
      const comment = event.target.comment.value
      event.target.comment.value = ''
      await this.props.createComment(comment, this.props.blog)
      this.props.notify(`Added comment '${comment}'!`, 5)
    }

    onDeleteBlog = async () => {
      await this.props.deleteBlog(this.props.blog)
      this.props.notify(`Blog deleted!`)
      this.props.history.push('/')
    }
 
    render() {
      const blog = this.props.blog
      if (!blog) {
        return null
      } else {
        const showDelete = blog.user.username === this.props.user.username
        const deleteButton = showDelete ? <button onClick={this.onDeleteBlog}>delete</button> : null
        return (
          <div>
            <h2 className="blog-title"> {blog.title} {blog.author}</h2>
            <div>
              <a href={blog.url}>{blog.url}</a>
              <p>{blog.likes} likes</p>
              <button onClick={this.onClickLikes}>like</button>
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

const mapStateToProps = (state) => {
  return {user: state.login}
}

const ConnectedBlog = connect(mapStateToProps, { increaseLikes, notify, createComment, deleteBlog })(Blog)

export default ConnectedBlog
import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisible = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
  
    increaseLikes = async () => {
      let updatedBlog = this.props.blog;
      updatedBlog.likes += 1;
      updatedBlog = await blogService.update(updatedBlog);
      this.props.onUpdateBlog(updatedBlog)
    }
  
    render() {
      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      const blog = this.props.blog
      const showWhenVisible = {display: this.state.visible ? '' : 'none'}
      const deleteButton = this.props.showDelete ? <button onClick={this.props.onDeleteBlog}>delete</button> : null
      return (
        <div style={blogStyle}>
             <p onClick={this.toggleVisible}> {blog.title} {blog.author}</p>
             <div style={showWhenVisible}>
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
  
export default Blog
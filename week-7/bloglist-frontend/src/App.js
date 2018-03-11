import React from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UserView from './components/UserView'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, logout, initializeCredentials } from './reducers/loginReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount = async () => {
    await this.props.initializeCredentials()

    await this.props.initializeUsers()
    const blogs = await blogService.getAll()
    this.setState({blogs})
  }

  login = async (event) => {
    event.preventDefault()
    try {
      this.props.login(this.state.username, this.state.password)
      this.setState({ username: '', password: '' })
    } catch (exception) {
      this.displayMessage('Käyttäjätunnus tai salasana virheellinen! ')
    }
  }

  logout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  addBlogToList = (newBlog) => {
    this.setState({
      blogs: this.state.blogs.concat(newBlog)
    })
    this.displayMessage(`A new blog '${newBlog.title}' by ${newBlog.author} added. `)
  }

  addUpdatedBlog = (updatedBlog) => {
    const updatedBlogs = this.state.blogs.filter(blog => blog._id !== updatedBlog._id).concat(updatedBlog)
    this.setState({blogs: updatedBlogs})
  }

  deleteBlog = (blog, history) => async () => {
    try {
      if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
        await blogService.destroy(blog)
        this.setState({
          blogs: this.state.blogs.filter(b => b._id !== blog._id)
        })
        history.push('/')
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  onCreateComment = (blog, comment) => {
    this.addUpdatedBlog(blog)
    this.displayMessage(`Comment '${comment}' added!`) 
  }

  displayMessage = (message) => {
    this.props.notify(message, 5)
  }

  userById = (id) => this.props.users.filter(user => user.id === id)[0]

  blogById = (id) => this.state.blogs.filter(blog => blog._id === id)[0]

  render() {
    const user = this.props.user
    if (user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <Notification/>
          <LoginForm 
            handleChange={this.handleLoginFieldChange} 
            handleSubmit={this.login} 
            username={this.state.username} 
            password={this.state.password}
          />
        </div>
      )
    }
    return (
      <div>
        <Router>
          <div>
            <h2>Blogs</h2>
            <Notification/>
            <Menu username={user.name} logout={this.logout}/>
            <Route exact path="/" render={() => 
              <BlogList 
                blogs={this.state.blogs} 
                addBlogToList={this.addBlogToList} 
                user={user}/>
              }
            />
            <Route exact path="/blogs/:id" render={({match, history}) => {
                const blog = this.blogById(match.params.id)
                return (
                  <Blog 
                    blog={blog} 
                    onUpdateBlog={this.addUpdatedBlog} 
                    onDeleteBlog={this.deleteBlog(blog, history)} 
                    onCreateComment={this.onCreateComment}
                    user={this.props.user}
                  />
                )
              }}
            />
            <Route exact path="/users" render={() => <UserList/>}/>
            <Route exact path="/users/:id" render={({match}) => <UserView user={this.userById(match.params.id)}/>}/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    users: state.users,
    login: state.login
  }
}

const ConnectedApp = connect(
  mapStateToProps, 
  { notify, initializeUsers, login, logout, initializeCredentials }
)(App)

export default ConnectedApp
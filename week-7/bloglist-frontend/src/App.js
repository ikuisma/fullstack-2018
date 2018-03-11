import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import usersService from './services/users'
import UserView from './components/UserView'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { Link } from 'react-router-dom'

const localStorageUserKey = 'user'

const Menu = ({username, logout}) => (
  <div>
    <Link exact to='/'>blogs</Link>  &nbsp;
    <Link exact to='/users'>users</Link>  &nbsp;
    {username} logged in.  &nbsp;
    <button onClick={logout}>Logout</button>     
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      user: null,
      username: '',
      password: '',
      error: null
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount = async () => {
    const user = this.loadUserFromLocalStorage()
    if (user !== null) {
      this.setState({ user, username: user.username, password: user.password })
    }
    const blogs = await blogService.getAll()
    const users = await usersService.getAll()
    this.setState({blogs, users})
  }

  saveUserToLocalStorage = (user) => {
    window.localStorage.setItem(localStorageUserKey, JSON.stringify(user))
  }

  clearUserFromLocalStorage = () => {
    window.localStorage.setItem(localStorageUserKey, null)
  }

  loadUserFromLocalStorage() {
    const userString = window.localStorage.getItem(localStorageUserKey)
    const user = userString !== undefined ? JSON.parse(userString) : null
    if (user !== null) {
      blogService.setToken(user.token)
    }
    return user
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.saveUserToLocalStorage(user)
      blogService.setToken(user.token)
      this.setState({ user, username: '', password: '' })
    } catch (exception) {
      this.displayMessage('Käyttäjätunnus tai salasana virheellinen! ')
    }
  }

  logout = (event) => {
    event.preventDefault()
    this.clearUserFromLocalStorage()
    this.setState({ user: null, username: '', password: '' })
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

  displayMessage = (message) => {
    this.setState({
      error: message,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  userById = (id) => this.state.users.filter(user => user.id === id)[0]

  blogById = (id) => this.state.blogs.filter(blog => blog._id === id)[0]

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <Notification message={this.state.error}/>
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
            <Notification message={this.state.error}/>
            <Menu username={this.state.user.name} logout={this.logout}/>
            <Route exact path="/" render={() => 
              <BlogList 
                blogs={this.state.blogs} 
                addBlogToList={this.addBlogToList} 
                user={this.state.user}/>
              }
            />
            <Route exact path="/blogs/:id" render={({match, history}) => {
                const blog = this.blogById(match.params.id)
                return (
                  <Blog 
                    blog={blog} 
                    onUpdateBlog={this.addUpdatedBlog} 
                    onDeleteBlog={this.deleteBlog(blog, history)} 
                    user={this.state.user}
                  />
                )
              }}
            />
            <Route exact path="/users" render={() => <UserList users={this.state.users}/>}/>
            <Route exact path="/users/:id" render={({match}) => <UserView user={this.userById(match.params.id)}/>}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
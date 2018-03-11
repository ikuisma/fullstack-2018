import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import usersService from './services/users'
import UserView from './components/UserView'
import UserList from './components/UserList'

const localStorageUserKey = 'user'

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

  deleteBlog = (blog) => async () => {
    try {
      if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
        await blogService.destroy(blog)
        this.setState({
          blogs: this.state.blogs.filter(b => b._id !== blog._id)
        })
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

  blogList = () => (
    <div>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="New blog">
        <CreateForm onSuccess={this.addBlogToList}/>
      </Toggleable>
      {this.state.blogs.sort((blogOne,blogTwo) => blogTwo.likes - blogOne.likes).map(blog => 
        <Blog 
          key={blog._id} 
          blog={blog} 
          onUpdateBlog={this.addUpdatedBlog} onDeleteBlog={this.deleteBlog(blog)} 
          showDelete={blog.user === undefined || blog.user.username === this.state.user.username}
        />
      )}
    </div>
  )

  userById = (id) => this.state.users.filter(user => user.id === id)[0]

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
            <div>
              {this.state.user.name} logged in.
              <button onClick={this.logout}>Logout</button>        
            </div>
            <Route exact path="/" render={this.blogList}/>
            <Route exact path="/users" render={() => <UserList users={this.state.users} />}/>
            <Route exact path="/users/:id" render={({match}) => <UserView user={this.userById(match.params.id)} />}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
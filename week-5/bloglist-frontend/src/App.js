import React from 'react'
import PropTypes from 'prop-types'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Blog from './components/Blog'

const localStorageUserKey = 'user'

const Notification = ({message}) => {
  if (message !== null) {
    return (
      <div>
        <h3>{message}</h3>
      </div>
    )
  } else {
    return null;
  }
}

const LoginForm = ({handleChange, handleSubmit, username, password}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus <input type="text" name="username" value={username} onChange={handleChange}/>
        </div>
        <div>
          Salasana <input type="password" name="password" value={password} onChange={handleChange}/>
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

class Toggleable extends React.Component {
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

  render() {
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
    const showWhenVisible = {display: this.state.visible ? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisible}>{this.props.buttonLabel}</button>
        </div>
        <div  style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisible}>Cancel</button>
        </div>
      </div>
    )  
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: null
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    const user = this.loadUserFromLocalStorage()
    if (user !== null) {
      this.setState({ user, username: user.username, password: user.password })
    }
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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
        <h2>Blogs</h2>
        <Notification message={this.state.error}/>
        <div>
          {this.state.user.name} logged in.
          <button onClick={this.logout}>Logout</button>        
        </div>
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
  }
}

export default App;

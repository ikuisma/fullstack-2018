import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'

const localStorageUserKey = 'user'

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

  componentDidMount() {
    const user = this.loadUserFromLocalStorage()
    console.log(user)
    if (user !== null) {
      this.setState({user, username: user.username, password: user.password})
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
    const user = JSON.parse(window.localStorage.getItem(localStorageUserKey))
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
      this.setState({user, username: '', password: ''})
    } catch (exception) {
      console.log(exception)
    }
  }

  logout = (event) => {
    event.preventDefault()
    this.clearUserFromLocalStorage()
    this.setState({user: null, username: '', password: ''})
  }

  addBlogToList = (newBlog) => {
    this.setState({
      blogs: this.state.blogs.concat(newBlog)
    })
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              Käyttäjätunnus <input type="text" name="username" value={this.state.username} onChange={this.handleLoginFieldChange}/>
            </div>
            <div>
              Salasana <input type="password" name="password" value={this.state.password} onChange={this.handleLoginFieldChange}/>
            </div>
            <button type="submit">Kirjaudu</button>
          </form>
        </div>
      )
    }
    return (
      <div>
        <h2>Blogs</h2>
        <div>
          {this.state.user.name} logged in.
          <button onClick={this.logout}>Logout</button>        
        </div>
        <h2>Create new blog</h2>
        <CreateForm onSuccess={this.addBlogToList}/>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;

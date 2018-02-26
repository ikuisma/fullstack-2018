import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({user, username: '', password: ''})
    } catch (exception) {
      console.log('Whoops!')
    }
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
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in. </p>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;

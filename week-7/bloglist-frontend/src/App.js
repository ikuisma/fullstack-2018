import React from 'react'
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
import { initializeBlogs } from './reducers/blogReducer'

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

  componentDidMount = async () => {
    await this.props.initializeCredentials()
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
  }

  logout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  userById = (id) => this.props.users.filter(user => user.id === id)[0]

  blogById = (id) => this.props.blogs.filter(blog => blog._id === id)[0]

  render() {
    const user = this.props.user
    if (user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <Notification/>
          <LoginForm/>
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
            <Route exact path="/" render={() => <BlogList/>}/>
            <Route exact path="/blogs/:id" render={({match, history}) => {
                const blog = this.blogById(match.params.id)
                return <Blog blog={blog} history={history}/>
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
    login: state.login,
    blogs: state.blogs
  }
}

const ConnectedApp = connect(
  mapStateToProps, 
  { notify, initializeUsers, login, logout, initializeCredentials, initializeBlogs }
)(App)

export default ConnectedApp
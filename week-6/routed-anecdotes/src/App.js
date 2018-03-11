import React from 'react'
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom'
import { Container, Menu, Table, Grid, Image } from 'semantic-ui-react'

const MenuLink = ({route, title}) => {
  const activeStyle = {
    fontStyle: 'italic'
  }
  const style = {
    padding: '.25em'
  }
  return (
    <Menu.Item link>
      <NavLink exact style={style} activeStyle={activeStyle} to={route}>{title}</NavLink>
    </Menu.Item>
  )
}

const AppMenu = () => (
  <Menu>
    <MenuLink route='/' title='anecdotes'/>
    <MenuLink route='/create' title='create new'/>
    <MenuLink route='/about' title='about'/>
  </Menu>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote => (
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table> 
  </div>
)

const About = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={10}>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Image src='http://cs-exhibitions.uni-klu.ac.at/fileadmin/template/documents/picture/EWD_thinking_1963.jpg'/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify(`a new anecdote ${this.state.content} created!`, 10)
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

const Anecdote = ({anecdote}) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const Notification = ({content}) => {
  const style = {
    margin: '.5em',    
    padding: '.5em',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: '5px',
    color: 'green'
  }
  return !content ? null : (
    <div>
      <p style={style}>{content}</p>
    </div>
  )
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (notification, seconds) => {
    const millis = seconds * 1000
    this.setState({notification})
    setTimeout(() => {
      this.setState({notification: ''})
    }, millis)
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <AppMenu/>
            <Notification content={this.state.notification}/>
            <Route exact path="/" render={() => <AnecdoteList  anecdotes={this.state.anecdotes}/>}/>
            <Route exact path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history} notify={this.notify}/>}/>
            <Route exact path="/about" render={() => <About/>}/>
            <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)}/>}/>
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;

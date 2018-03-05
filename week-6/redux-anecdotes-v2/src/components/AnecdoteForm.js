import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import notificationService from '../services/notifications'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      const anecdote = await anecdoteService.createNew({ content })
      this.props.anecdoteCreation(anecdote)
      notificationService.displayNotification(`New anecdote '${content}' added. `)
  }
  render() {
      return (
          <div>
              <h2>create new</h2>
              <form onSubmit={this.handleSubmit}>
                  <div><input name='anecdote'/></div>
                  <button>create</button> 
              </form>
          </div>
      )
  }
}

export default connect(null, { anecdoteCreation })(AnecdoteForm)
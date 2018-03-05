import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import notificationService from '../services/notifications'


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      this.props.store.dispatch(anecdoteCreation(content))
      notificationService.displayNotification(`New anecdote '${content}' added. `)
      e.target.anecdote.value = ''
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

export default AnecdoteForm
import React from 'react';

class App extends React.Component {

  voteFor(anecdote) {
    return () => {
      this.props.store.dispatch({
        type: 'VOTE',
        data: {anecdote}
      })
    }
  }

  onCreate = (event) =>{
    event.preventDefault()
    this.props.store.dispatch({
      type: 'CREATE',
      data: {content: event.target.content.value}
    })
    event.target.content.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((one, two) => two.votes - one.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteFor(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.onCreate}>
          <div><input name="content"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App
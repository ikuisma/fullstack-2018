import React from 'react'
import notificationsService from '../services/notifications'

class AnecdoteList extends React.Component {
    render() {
        const anecdotes = this.props.store.getState().anecdotes
        const onVote = (anecdote) => {
            this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
            notificationsService.displayNotification(`You voted '${anecdote.content}'`)
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
              has {anecdote.votes}
                            <button onClick={() => onVote(anecdote)}>
                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList

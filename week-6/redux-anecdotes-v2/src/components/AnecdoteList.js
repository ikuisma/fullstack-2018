import React from 'react'
import notificationsService from '../services/notifications'
import Filter from './Filter'
import { connect } from 'react-redux' 
import { anecdoteVote } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
    render() {
        const anecdotes = () => {
            const filter = this.props.filter
            const all = this.props.anecdotes
            if (filter === null) {
                return all
            } else {
                return all.filter(a => a.content.includes(filter))
            }
        }
        const onVote = (anecdote) => {
            this.props.anecdoteVote(anecdote.id)
            notificationsService.displayNotification(`You voted '${anecdote.content}'`)
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter store={this.props.store}/>
                {anecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

export default connect(mapStateToProps, { anecdoteVote })(AnecdoteList)

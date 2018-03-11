import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux' 
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
    render() {
        const onVote = async (anecdote) => {
            await this.props.voteForAnecdote(anecdote)
            await this.props.notify(`You voted '${anecdote.content}'`, 5000)
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter store={this.props.store}/>
                {this.props.anecdotesToShow.map(anecdote =>
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

const anecdotes = (filter, anecdotes) => {
    let anecdotesToShow = filter === null ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
    return anecdotesToShow.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotes(state.filter, state.anecdotes)
    }
}

export default connect(mapStateToProps, { voteForAnecdote, notify })(AnecdoteList)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const randomExcluding = (max, exclude) => {
    let number = Math.floor(Math.random() * Math.floor(max));
    if (number >= exclude) {
        number++
    }
    return number
}

const maxValueIndex = (values) => {
    const reducer = (acc, value, index, values) => (values[acc] < value) ? index : acc
    return values.reduce(reducer, 0)
}

const Anecdote = ({text, votes}) => (
    <div>
        <p>{text}</p>
        <p>has {votes} votes</p>
    </div>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(anecdotes.length).fill(0)
        }
    }

    randomPickSelected = () => {
        const maxIndex = this.props.anecdotes.length - 1
        this.setState({selected: randomExcluding(maxIndex, this.state.selected)})
    }

    voteFor = (index) => () => {
        let votes = this.state.votes
        votes[index] = votes[index] + 1
        this.setState({votes: votes})
    }

    render() {
        const mostVotedAnecdote = maxValueIndex(this.state.votes)
        return (
            <div>
                <Anecdote text={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]}/>
                <p></p>
                <button onClick={this.voteFor(this.state.selected)}>vote</button>
                <button onClick={this.randomPickSelected}>next anecdote</button>
                <h2>anecdote with most votes:</h2>
                <Anecdote text={this.props.anecdotes[mostVotedAnecdote]} votes={this.state.votes[mostVotedAnecdote]}/>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

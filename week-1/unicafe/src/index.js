import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Palaute = ({handleGood, handleNeutral, handleBad}) => (
    <div>
        <h2>anna palautetta</h2>
        <div>
            <button onClick={handleGood}>hyvä</button>
            <button onClick={handleNeutral}>neutraali</button>
            <button onClick={handleBad}>huono</button>
        </div>
    </div>
)

const Statistiikka = ({good, neutral, bad}) => (
        <div>
            <h2>statistiikka</h2>
            <p>hyvä {good}</p>
            <p>neutraali {neutral}</p>
            <p>huono {bad}</p>
        </div>
)

const Average = ({good, neutral, bad}) => {
    const average = (good - bad) / (good + neutral + bad)
    return (
        <div>
            <p>keskiarvo {average}</p>
        </div>
    )
}

const Positiivisia = ({good, neutral, bad}) => {
    const percentage = (good) / (good + neutral + bad) * 100
    return (
        <div>
            <p>positiivisia {percentage} %</p>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }
    increaseCount = (attribute) => () => {
        this.setState({
            [attribute]: this.state[attribute] + 1
        })
    }
    increaseGood = this.increaseCount("good")
    increaseNeutral =  this.increaseCount("neutral")
    increaseBad = this.increaseCount("bad")
    render() {
        return (
            <div>
                <Palaute handleGood={this.increaseGood} handleNeutral={this.increaseNeutral} handleBad={this.increaseBad}/>
                <Statistiikka good={this.state.good} bad={this.state.bad} neutral={this.state.neutral}/>
                <Average good={this.state.good} bad={this.state.bad} neutral={this.state.neutral}/>
                <Positiivisia good={this.state.good} bad={this.state.bad} neutral={this.state.neutral}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

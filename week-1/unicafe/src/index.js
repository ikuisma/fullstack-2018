import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({name, handleClick}) => (<button onClick={handleClick}>{name}</button>)

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total===0) {
        return (
            <p>ei yhtään palautetta annettu</p>
        )
    }
    const average = (good - bad) / total
    const positives = (good / total * 100) + '%'
    return (
        <div>
            <Statistic name="hyvä" value={good}/>
            <Statistic name="neutraali" value={neutral}/>
            <Statistic name="huono" value={bad}/>
            <Statistic name="keskiarvo" value={average}/>
            <Statistic name="positiivisia" value={positives}/>
        </div>
    )
}

const Statistic = ({name, value}) => (<p>{name} {value}</p>)

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
    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <div>
                    <Button handleClick={this.increaseCount("good")} name="hyvä"/>
                    <Button handleClick={this.increaseCount("neutral")} name="neutral"/>
                    <Button handleClick={this.increaseCount("bad")} name="huono"/>
                </div>
                <h2>statistiikka</h2>
                <Statistics good={this.state.good} bad={this.state.bad} neutral={this.state.neutral}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

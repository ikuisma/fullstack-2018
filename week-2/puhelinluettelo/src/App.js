import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    handleNameChange = (event) => {
        const newName = event.target.value
        this.setState({newName})
    }

    addPerson = (event) => {
        event.preventDefault()
        const persons = this.state.persons.concat({'name': this.state.newName})
        this.setState({
            persons,
            newName: ''
        })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {this.state.persons.map((person) => <li key={person.name}>{person.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default App
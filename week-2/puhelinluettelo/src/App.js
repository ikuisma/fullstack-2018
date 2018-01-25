import React, {Component} from 'react';

const Number = ({person}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td></tr>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456'}
            ],
            newName: '',
            newNumber: ''
        }
    }

    handleNameChange = (event) => {
        const newName = event.target.value
        this.setState({newName})
    }

    handleNumberChange = (event) => {
        const newNumber = event.target.value
        this.setState({newNumber})
    }

    personWithNameExists = (name) => this.state.persons.some((person) => person.name === name)

    addPerson = (event) => {
        event.preventDefault()

        if (this.personWithNameExists(this.state.newName)) {
            return
        }

        const persons = this.state.persons.concat({
            name: this.state.newName,
            number: this.state.newNumber
        })
        this.setState({
            persons,
            newName: '',
            newNumber: ''
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
                        numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons.map((person) => <Number key={person.name} person={person}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App
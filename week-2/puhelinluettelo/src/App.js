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
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            filterKeyword: ''
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

    handleFilterChange = (event) => {
        const filterKeyword = event.target.value
        this.setState({filterKeyword})
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

    getFilteredPersons() {
        if (this.state.filterKeyword.length === 0) {
            return this.state.persons
        } else {
            return this.state.persons.filter((person) => person.name.match(new RegExp(this.state.filterKeyword, "i")))
        }
    }

    render() {
        const persons = this.getFilteredPersons()
        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <div>rajaa näytettäviä <input value={this.state.filterKeyword} onChange={this.handleFilterChange}/></div>

                <h2>Lisää uusi</h2>

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
                        {persons.map((person) => <Number key={person.name} person={person}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App
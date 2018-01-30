import React, {Component} from 'react';
import personService from './services/person'

const Notification = ({message}) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }
}

const Number = ({person, onClick}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={onClick}>Poista</button></td></tr>
    )
}

const Numbers = ({persons, removePerson}) => (
    <table>
        <tbody>
        {persons.map((person) => <Number key={person.name} person={person} onClick={removePerson(person)}/>)}
        </tbody>
    </table>
)

const FieldInput = ({label, attributes}) => (
    <div>
        {label} <input value={attributes.value} onChange={attributes.onChange}/>
    </div>
)

const AddPersonForm = ({onSubmit, fields}) => (
    <form onSubmit={onSubmit}>
        {fields.map((field) => <FieldInput key={field.label} label={field.label} attributes={field.attributes}/>)}
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filterKeyword: '',
            message: null
        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({ persons })
        })
    }

    handleInputChange = (attributeName) => (event) => {
        const value = event.target.value
        this.setState({[attributeName]: value})
    }

    personWithNameExists = (name) => this.state.persons.some((person) => person.name === name)

    createNewPerson = (person) => {
        personService
            .create(person)
            .then(person => {
                this.setState({
                    persons: this.state.persons.concat(person),
                    newName: '',
                    newNumber: ''
                })
            }).then(
                this.displayMessage(`Henkilö ${person.name} on lisätty. `)
            )
    }

    updateOldPerson = (updatedPerson) => {
        const oldPerson = this.state.persons.find(person => person.name === this.state.newName)
        updatedPerson = {...oldPerson, ...updatedPerson}
        personService
            .update(updatedPerson)
            .then(updatedPerson => {
                const persons = this.state.persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
                this.setState({persons})
            }).then(
                this.displayMessage(`Henkilön ${updatedPerson.name} numero on päivitetty. `)
            )
    }

    displayMessage = (message) => {
        this.setState({message})
        setTimeout(() => {
            this.setState({message: null})
        }, 5000)
    }

    addPerson = (event) => {
        event.preventDefault()

        let person = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (this.personWithNameExists(person.name)) {
            if (window.confirm(`${person.name} on jo olemassa, korvataanko vanha numero uudella?`)) {
                this.updateOldPerson(person)
            } else {
                return
            }
        } else {
            this.createNewPerson(person)
        }
    }

    removePerson = (person) => (event) => {
        if (window.confirm(`Poistetaanko ${person.name}?`)) {
            personService
                .remove(person)
                .then(removedPerson =>
                    this.setState({
                        persons: this.state.persons.filter(person => person.id !== removedPerson.id)
                    })
                ).then(
                    this.displayMessage(`Henkilö ${person.name} on poistettu. `)
                )
        }
    }

    getFilteredPersons() {
        if (this.state.filterKeyword.length === 0) {
            return this.state.persons
        } else {
            return this.state.persons.filter((person) => person.name.match(new RegExp(this.state.filterKeyword, "i")))
        }
    }

    inputFieldProps = (label, attribute) => {
        return {label: label, attributes: this.inputAttributesFor(attribute)}
    }

    inputAttributesFor = (attributeName) => ({
        value: this.state[attributeName],
        onChange: this.handleInputChange(attributeName)
    })

    render() {
        const persons = this.getFilteredPersons()
        const inputFields = [
            this.inputFieldProps('nimi', 'newName'),
            this.inputFieldProps('numero', 'newNumber')
        ]
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message}/>
                <FieldInput label="rajaa näytettäviä" attributes={this.inputAttributesFor('filterKeyword')}/>

                <h2>Lisää uusi</h2>
                <AddPersonForm onSubmit={this.addPerson} fields={inputFields}/>

                <h2>Numerot</h2>
                <Numbers persons={persons} removePerson={this.removePerson} />
            </div>
        )
    }
}

export default App
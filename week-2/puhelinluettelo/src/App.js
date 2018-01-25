import React, {Component} from 'react';

const Number = ({person}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td></tr>
    )
}

const Numbers = ({persons}) => (
    <table>
        <tbody>
        {persons.map((person) => <Number key={person.name} person={person}/>)}
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

    handleInputChange = (attributeName) => (event) => {
        const value = event.target.value
        this.setState({[attributeName]: value})
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
                <FieldInput label="rajaa näytettäviä" attributes={this.inputAttributesFor('filterKeyword')}/>

                <h2>Lisää uusi</h2>
                <AddPersonForm onSubmit={this.addPerson} fields={inputFields}/>

                <h2>Numerot</h2>
                <Numbers persons={persons}/>
            </div>
        )
    }
}

export default App
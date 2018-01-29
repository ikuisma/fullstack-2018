import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const CountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flag} alt={'Flag of ' + country.name}/>
        </div>
    )
}

const CountryList = ({countries, onClick}) => {
    return (
        <ul>
            {countries.map(country => <div onClick={country.onClick} key={country.numericCode} >{country.name}</div>)}
        </ul>
    )
}

const SearchResult = ({countries}) => {
    if (countries.length === 1) {
        return (
            <CountryInfo country={countries[0]}/>
        )
    } else if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter. </p>
        )
    } else {
        return (
            <CountryList countries={countries}/>
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filterKeyword: ''
        }
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            const countries = response.data.map(country => Object.assign(country, {onClick: this.handleOnClick(country.name)}))
            this.setState({
                countries
            })
            console.log(this.state.countries)
        })
    }

    handleOnClick = (name) => (event) => {
        this.setState({
            filterKeyword: name
        })
    }

    updateFilter = (event) => {
        this.setState({
            filterKeyword: event.target.value
        })
    }

    filterCountries = (filterKeyword) => {
        const containsFilterCaseInsensitive = new RegExp(filterKeyword, "i")
        return this.state.countries.filter(country => containsFilterCaseInsensitive.test(country.name))
    }

    render() {
        const countries = this.filterCountries(this.state.filterKeyword);
        return (
            <div className="App">
                <h1>Countries</h1>
                <div>
                    Find countries:
                    <input value={this.state.filterKeyword} onChange={this.updateFilter}/>
                </div>
                <SearchResult countries={countries}/>
            </div>
        );
    }
}

export default App;

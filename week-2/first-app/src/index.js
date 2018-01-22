import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Otsikko = ({title}) => (<h1>{title}</h1>)

const Osa = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Sisalto = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Osa key={part.id} name={part.nimi} exercises={part.tehtavia}/>)}
        </div>
    )
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko title={kurssi.nimi}/>
            <Sisalto parts={kurssi.osat}/>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

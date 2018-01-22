import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Otsikko = ({title}) => (<h1>{title}</h1>)

const Osa = ({text}) => (<p>{text}</p>)

const Sisalto = ({parts}) => {
    const totalExercises = parts.reduce((acc, part) => acc + part.tehtavia, 0)
    return (
        <div>
            {parts.map(part => <Osa key={part.id} text={part.nimi + " " + part.tehtavia}/>)}
            <Osa text={"Yhteensä " + totalExercises + " tehtävää"}/>
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Osa = (props, key) => {
    return (
        <p key={key}>{props.osa} {props.tehtava}</p>
    )
}

const Sisalto = (props) => {
    return props.osat.map((rivi, i) =>
        <Osa key={i} osa={rivi.osa} tehtava={rivi.tehtava}/>
    )
}

const Yhteensa = (props) => {
    const yhteensa = props.osat.map(element => element.tehtava).reduce((prev, curr) => prev + curr)
    return (
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}

function rivi(osa, tehtava) {
    return {'osa': osa, 'tehtava': tehtava}
}

const App = () => {
    const kurssi = {
        nimi : 'Half Stack -sovelluskehitys',
        osat : [
            rivi('Reactin perusteet', 10),
            rivi('Tiedonvälitys propseilla', 7),
            rivi('Komponenttien tila', 14)
        ]
    }
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

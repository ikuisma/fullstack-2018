import React from 'react';

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

export default Kurssi
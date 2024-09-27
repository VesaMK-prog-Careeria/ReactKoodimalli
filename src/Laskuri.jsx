import './App.css'
import React, {useState} from 'react'

// Laskuri komponentti joka käyttää tilaa
//const Laskuri = (props) => { kun tiedetään että propsissa on vain yksi funktio niin propsin voi purkaa suoraan
const Laskuri = ({huomio}) => {
    // Komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>
        <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(0)}>nollaa</button>

        {/* <button onClick={props.huomio}>Huomio</button> */}
        <button onClick={huomio}>Huomio</button>
    </>
  )
}

export default Laskuri

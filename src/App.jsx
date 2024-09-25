import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import React, {useState} from 'react'

const App = () => {

// App komponentin tilan määritys
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert('Huomio!') // alertti joka tulostaa Huomio! kun sitä kutsutaan
}

  return (
    <>
      <div className="App">
        <h1>Hello from react</h1>

        {showLaskuri && <Laskuri huomio={huomio} />} {/* jos showLaskuri on true niin renderöidään Laskuri komponentti */}
        {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>} {/* jos showLaskuri on false niin renderöidään button */}
        {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>} {/* jos showLaskuri on true niin renderöidään button */}
        
        <Viesti teksti="Tämä on viesti propsin kautta" />
      </div>
    </>
  )
}

export default App 

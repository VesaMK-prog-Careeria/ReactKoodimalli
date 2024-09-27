import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import Posts2 from './Posts2'
import CustomerList from './CustomerList'
import Viesti from './Viesti'
import React, {useState} from 'react'

const App = () => {

// App komponentin tilan määritys
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setShowPosts] = useState(false)
const [showPosts2, setShowPosts2] = useState(false)

const huomio = () => {
  alert('Huomio!') // alertti joka tulostaa Huomio! kun sitä kutsutaan
}

  return (
    <>
      <div className="App">
        <h1>Hello from react</h1>

        {showPosts && <button onClick={() => setShowPosts(false)}>Piilota postaukset</button>} {/* jos showPosts on true niin renderöidään button */}
        {showPosts && <Posts />} {/* jos showPosts on true niin renderöidään Posts komponentti */}
        {!showPosts && <button onClick={() => setShowPosts(true)}>Näytä postaukset</button>} {/* jos showPosts on false niin renderöidään button */}

        {showLaskuri && <Laskuri huomio={huomio} />} {/* jos showLaskuri on true niin renderöidään Laskuri komponentti */}
        {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>} {/* jos showLaskuri on false niin renderöidään button */}
        {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>} {/* jos showLaskuri on true niin renderöidään button */}
        
        <Viesti teksti="Tämä on viesti propsin kautta" />
      </div>
      <div>
        {showPosts2 && <button onClick={() => setShowPosts2(false)}>Piilota postaukset 2</button>} {/* jos showPosts on true niin renderöidään button */}
        {showPosts2 && <Posts2 />} {/* jos showPosts on true niin renderöidään Posts2 komponentti */}
        {!showPosts2 && <button onClick={() => setShowPosts2(true)}>Näytä postaukset 2</button>} {/* jos showPosts on false niin renderöidään button */}
      </div>
      <div>
        <CustomerList />
      </div>
    </>
  )
}

export default App 

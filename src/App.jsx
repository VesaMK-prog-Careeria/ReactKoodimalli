import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import Posts2 from './Posts2'
import CustomerList from './Customer/CustomerList'
import UserList from './User/UserList'
import Viesti from './Viesti'
import React, {useEffect, useState} from 'react'
import Message from './Message'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'

const App = () => {

// App komponentin tilan määritys
// const [showLaskuri, setShowLaskuri] = useState(false)
// const [showPosts, setShowPosts] = useState(false)
// const [showPosts2, setShowPosts2] = useState(false)
// Message statet
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedIn, setLoggedIn] = useState(false)

useEffect(() => { //pysytään kirjautuneena vaikka sivu päivittyy
  if(localStorage.getItem('username') !== null) {
    setLoggedIn(true)
  }
}, [])
// Logout metodi
const logout = () => {
  localStorage.clear()
  setLoggedIn(false)
}

const huomio = () => {
  alert('Huomio!') // alertti joka tulostaa Huomio! kun sitä kutsutaan
}

  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand href="/">React App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/customer">Customers</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
              <Nav.Link href="/posts2">Posts2</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
              <Nav.Link href="/laskuri">Laskuri</Nav.Link>
              {loggedIn && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <h1>React kurssi</h1>
        {/* kun lähetetään messagelle eli propsille viesti ja se on positiivinen niin se näytetään */}
        {showMessage && <Message message={message} isPositive={isPositive} />} {/* Message komponentti */}
        {!loggedIn && <Login 
          setIsPositive={setIsPositive} 
          setMessage={setMessage} 
          setShowMessage={setShowMessage}
          setLoggedIn={setLoggedIn} />}
        {loggedIn &&
        <Routes>
          <Route path="/customer" 
          element={<CustomerList 
          setIsPositive={setIsPositive} 
          setMessage={setMessage} 
          setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/users"
          element={<UserList 
          setIsPositive={setIsPositive} 
          setMessage={setMessage} 
          setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/posts"
          element={<Posts info="Nämä ovat postauksia."
          tervehdys="Hello!"/>}>
          </Route>

          <Route path="/posts2"
          element={<Posts2 />}>
          </Route>

          <Route path="/laskuri"
          element={<Laskuri huomio={huomio} />}>
          </Route>

          </Routes>
        }
      </Router>
    </div>
  )
}

export default App

// Ilman bootsrappeja yms.
//   return (
//     <>
//       <div className="App">
//         <h1>React kurssi</h1>
//         {/* kun lähetetään messagelle eli propsille viesti ja se on positiivinen niin se näytetään */}
//         {showMessage && <Message message={message} isPositive={isPositive} />} {/* Message komponentti */}

//         {showPosts && <button onClick={() => setShowPosts(false)}>Piilota postaukset</button>} {/* jos showPosts on true niin renderöidään button */}
//         {showPosts && <Posts />} {/* jos showPosts on true niin renderöidään Posts komponentti */}
//         {!showPosts && <button onClick={() => setShowPosts(true)}>Näytä postaukset</button>} {/* jos showPosts on false niin renderöidään button */}

//         {showLaskuri && <Laskuri huomio={huomio} />} {/* jos showLaskuri on true niin renderöidään Laskuri komponentti */}
//         {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>Näytä laskuri</button>} {/* jos showLaskuri on false niin renderöidään button */}
//         {showLaskuri && <button onClick={() => setShowLaskuri(false)}>Piilota laskuri</button>} {/* jos showLaskuri on true niin renderöidään button */}
        
//         {/*! viesti komponentti antaa propsin juuresta ylös */}
//         <Viesti teksti="Tämä on viesti propsin kautta" />
//       </div>
//       <div>
//         {showPosts2 && <button onClick={() => setShowPosts2(false)}>Piilota postaukset 2</button>} {/* jos showPosts on true niin renderöidään button */}
//         {showPosts2 && <Posts2 />} {/* jos showPosts on true niin renderöidään Posts2 komponentti */}
//         {!showPosts2 && <button onClick={() => setShowPosts2(true)}>Näytä postaukset 2</button>} {/* jos showPosts on false niin renderöidään button */}
//       </div>
//       <div>
//         <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
//       </div>
//     </>
//   )
// }

// export default App 

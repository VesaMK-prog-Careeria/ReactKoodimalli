import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'


const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, setReload] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState('')

useEffect(() => { //tiedonhaku NW:n users taulusta, useEffect hookilla haetaan tiedot kun sivu latautuu
  UserService.getAll()
    .then(data => {
        setUsers(data)
    })
},[lisäystila, reload, muokkaustila] //jos lisäystila muuttuu niin hakee uudet tiedot
)

// Hakukentän onChange tapahtumkäsittelijä
const handleSearch = (e) => {
  setSearch(e.target.value.toLowerCase())
}

const editUsers = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
}

  return (
    <>
        <h2><nobr>Users from NW</nobr>
            <div>
            {!lisäystila && <button className='nappi' onClick={() => setLisäystila(true)}>Lisää käyttäjä</button>}
            </div>
            </h2>

            {!lisäystila && !muokkaustila && 
                  <input type='text' placeholder='Hae sukunimen perusteella' onChange={handleSearch} value={search} />
                  }

                  <table id='userTable'>
                    <thead>
                        <tr>
                            <th>Etunimi</th>
                            <th>Sukunimi</th>
                            <th>Sähköposti</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>

                    {users && users.map(u =>  // loopataan customers taulukko ja tulostetaan jokainen asiakas omalle rivilleen */}
                    {
                        const lowerCaseName = u.lastName.toLowerCase()
                        if (lowerCaseName.indexOf(search) > -1) {
                            return(
                                <tr key={u.userId}> {/*katso swaggerista mitkä ovat kenttien nimet*/}
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.accesslevelId}</td>
                                </tr>
                            )
                        }
                        }
                    )}
                    </tbody>
                </table>
    </>
    )
}

export default UserList
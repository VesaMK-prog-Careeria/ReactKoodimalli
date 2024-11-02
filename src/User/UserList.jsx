import '../App.css'
import React, {useState, useEffect} from 'react'
import UserService from '../services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

// function ja const ovat Reactin hookseja, const on uudempi tapa
const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
// Statet aina ennen useEffectia
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

// Käyttäjän poistaminen
const deleteUser = (user) => {
    if (window.confirm('Are you sure you want to delete ' + user.lastName + user.firstName + '?')) {
        UserService.remove(user.userId)
        .then(() => {
            setIsPositive(true)
            setMessage('User ' + user.lastName + user.firstName + ' deleted')
            setShowMessage(true)
            setReload(!reload)

            setTimeout(() => {
                setShowMessage(false)
            }, 6000)
        })
        .catch(error => {
            setIsPositive(false)
            setMessage('User ' + user.lastName + user.firstName + ' was not deleted')
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 6000)
        })
    }
}

const editUser = (user) => {
    //console.log('editUser called with:', user)
    setMuokkaustila(true)
    setMuokattavaUser(user)
}

  return (
    <>
        <h2><nobr>Users from NW</nobr>
        {muokkaustila && ( // UserEdit -komponentti näytetään, jos muokkaustila on true
            <UserEdit
                setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive}
                setMessage={setMessage}
                setShowMessage={setShowMessage}
                muokattavaUser={muokattavaUser}
                reload={reload}
                setReload={setReload}
            />
            )}
            {lisäystila && // Lisää User -komponentti näytetään, jos lisäystila on true
            <UserAdd 
                setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} 
                setMessage={setMessage} 
                setShowMessage={setShowMessage} />}
            <div>
            {!lisäystila && !muokkaustila && // Piilotetaan Lisää User -nappi, jos lisäys- tai muokkaustila on päällä
                <button 
                    className='nappi' 
                    onClick={() => setLisäystila(true)}>Lisää käyttäjä
                </button>}
            </div>
            </h2>

            {!lisäystila && !muokkaustila && // Piilotetaan hakukenttä, jos lisäys- tai muokkaustila on päällä
            <>
                  <input 
                  type='text' 
                  placeholder='Hae sukunimen perusteella' 
                  onChange={handleSearch} 
                  value={search} 
                  />
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
                    {users && // Taulukon generointi käyttäjätiedoista
                        users.map((u) => { // Käydään käyttäjät läpi map-funktiolla
                        const lowerCaseName = u.lastName.toLowerCase();
                        if (lowerCaseName.indexOf(search) > -1) {
                            return (
                            <tr key={u.userId}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.accesslevelId}</td>
                                <td>
                                <button onClick={() => editUser(u)}>Edit</button>
                                </td>
                                <td>
                                <button onClick={() => deleteUser(u)}>Delete</button>
                                </td>
                            </tr>
                            );
                        } else {
                            return null;
                        }
                        })}
                    </tbody>
                </table>
                </>
                }
    </>
    )
}

export default UserList
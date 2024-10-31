import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage, reload, setReload}) => {


const [newFirstname, setNewFirstname] = useState('') //tämä kerää uuden käyttäjän tiedot joka painalluksella
const [newLastname, setNewLastname] = useState('') //ja sitten kun painetaan submit nappia niin tiedot lähetetään tietokantaan
const [newEmail, setNewEmail] = useState('') //ja tämä tyhjentää tilan
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newUser = { //uusi asiakasobjekti
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword) //md5 kirjaston salaus
    }
    console.log(newUser)

    UserService.create(newUser) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Käyttäjän lisäys onnistui ' + newUser.firstname + '' + newUser.lastname) //tämä asettaa viestin
            setShowMessage(true) //tämä näyttää viestin
            setIsPositive(true) //tämä asettaa viestin positiiviseksi
            
            setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
                setShowMessage(false) //tämä piilottaa viestin
                setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
            },6000)

            setLisäystila(false) //tämä sulkee lisäyslomakkeen
        }
    })
    .catch(error => { //jos tulee virhe niin alerttiin tulee asiakkaan lisäys ei onnistunut
        //alert('Asiakkaan lisäys ei onnistunut')
        window.scrollTo(0, 0)
        setMessage('Käyttäjän lisäys ei onnistunut') //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(false) //tämä asettaa viestin negatiiviseksi
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
        },3000)
    })

    // setTimeout(() => { //500ms jälkeen tyhjennetään tilat
    //     setLisäystila(false) //tämä sulkee lisäyslomakkeen
    // },500)
            
}

return (
    <div id='addNew'>
            <h2>Käyttäjän lisäys</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                            <input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} 
                            placeholder='Etunimi' required/>
                    </div>
                    <div>
                            <input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} 
                            placeholder='Sukunimi' required/>
                    </div>
                    <div>
                            <input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} 
                            placeholder='Sähköposti'/>
                    </div>
                    <div>
                            <input type='number' value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} 
                            placeholder='Käyttö oikeus taso'/>
                    </div>
                    <div>
                            <input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} 
                            placeholder='Käyttäjätunnus'/>
                    </div>
                    <div>
                            <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} 
                            placeholder='Salasana'/>
                    </div>
                <input type='submit' value='Talenna'/>
                <input type='button' value='Peruuta' onClick={() => setLisäystila(false)}/>
            </form>
    </div>
)
}

export default UserAdd
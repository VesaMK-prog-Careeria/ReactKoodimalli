import '../App.css'
import React, {useState} from 'react'
import UserService from '../services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage, reload, setReload}) => {

// Komponentin tilan määritys jotka pitävät kirjaa käyttäjän input kenttien arvoista
const [newFirstname, setNewFirstname] = useState('') //tämä kerää uuden käyttäjän tiedot joka painalluksella
const [newLastname, setNewLastname] = useState('') //ja sitten kun painetaan submit nappia niin tiedot lähetetään tietokantaan
const [newEmail, setNewEmail] = useState('') //ja tämä tyhjentää tilan
const [newAccesslevelId, setNewAccesslevelId] = useState('')
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [password2, setPassword2] = useState('')
const [errorMessage, setErrorMessage] = useState('') //tämä on virheviesti joka tulee jos salasanat eivät täsmää

const handlePassword2Change = (event) => {
    const { value } = event.target
    setPassword2(value)
    if (newPassword !== value) {
        setErrorMessage('Salasanat eivät täsmää')
    }
    else {
        setErrorMessage('')
    }
}
//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    if (newPassword !== password2) {
        setErrorMessage('Salasanat eivät täsmää') //tämä asettaa viestin
        return
    }
    var newUser = { //uusi asiakasobjekti
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword) //md5 kirjaston salaus, newPasswordin arvo salataan
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
}

return (
    <div id='addNew'>
            <h2>Käyttäjän lisäys</h2>
            <form onSubmit={handleSubmit}>
                    <div id='userAdd'>
                            <input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} 
                            placeholder='Etunimi' required/>
                    </div>
                    <div id='userAdd'>
                            <input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} 
                            placeholder='Sukunimi' required/>
                    </div>
                    <div id='userAdd'>
                            <input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} 
                            placeholder='Sähköposti'/>
                    </div>
                    <div id='userAdd'>
                            <input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} 
                            placeholder='Käyttäjätunnus'/>
                    </div>
                    <div id='userAdd'>
                            <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} 
                            placeholder='Salasana'/>
                    </div>
                    <div id='userAdd'>
                        <input type='password' value={password2} onChange={handlePassword2Change} placeholder='Salasana uudelleen' />
                    </div>
                    <div id='userAdd'>
                            <select value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)}>
                                <option value=''>Käyttöoikeustaso</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                            </select>
                    </div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <br/>
                <input type='submit' value='Talenna'/>
                <input type='button' value='Peruuta' onClick={() => setLisäystila(false)}/>
            </form>
    </div>
)
}

export default UserAdd
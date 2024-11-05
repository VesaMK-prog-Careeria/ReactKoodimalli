import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const Login = ({setLoggedIn, setIsPositive, setMessage, setShowMessage, reload, setReload}) => {

const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState('')

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var user = { //uusi asiakasobjekti
        username: newUsername,
        password: md5(newPassword), //md5 kirjaston salaus, newPasswordin arvo salataan

    }
    //console.log(user)

    UserService.Login(user) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => {
        window.scrollTo(0, 0)
        setMessage('Kirjautuminen onnistui ' + user.username) //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(true) //tämä asettaa viestin positiiviseksi
        
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
            //setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
        },6000)
        //tallenetaan localstorageen käyttäjänimi ja salasana eli token
        localStorage.setItem('username', user.username) //tallennetaan username localstorageen
        localStorage.setItem('password', user.password) //tallennetaan password localstorageen
        localStorage.setItem('accesslevelId', response.accesslevelId) //tallennetaan accesslevelId localstorageen
        //localStorage.setItem('user', JSON.stringify(response.data)) //tallennetaan kaikenkattava käyttäjä localstorageen
        setLoggedIn(true) //muutetaan app komponentin tilaa
    })
    .catch(error => { //jos tulee virhe niin alerttiin tulee kirjautuminen ei onnistunut
        window.scrollTo(0, 0)
        setMessage('Kirjautuminen ei onnistunut') //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(false) //tämä asettaa viestin negatiiviseksi
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
        },3000)
    })          
}

return (
    <div id='addNew'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                    <div id='userAdd'>
                            <input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} 
                            placeholder='Käyttäjätunnus'/>
                    </div>
                    <div id='userAdd'>
                            <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} 
                            placeholder='Salasana'/>
                    </div>
                    <br/>
                <input type='submit' value='Kirjaudu'/>
                <input type='button' value='Tyhjennä'/>
            </form>
    </div>
    )
}

export default Login
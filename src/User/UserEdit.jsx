import '../App.css'
import React, {useState} from 'react'
import UserService from '../services/User'
import md5 from 'md5'

/** tässä tulee propsina setMuokkaustila jne. ja lähtee action alaspäin */
const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser, reload, setReload}) => {
    //console.log('muokattavaUser: ', muokattavaUser)
/** Tässä muokataan tietty user */
const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstName) //tämä kerää uuden käyttäjän tiedot joka painalluksella
const [newLastname, setNewLastname] = useState(muokattavaUser.lastName) //ja sitten kun painetaan submit nappia niin tiedot lähetetään tietokantaan
const [newEmail, setNewEmail] = useState(muokattavaUser.email) //ja tämä tyhjentää tilan
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword, setNewPassword] = useState(muokattavaUser.password)


//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newUser = { //uusi asiakasobjekti, pitää olla samat nimet kuin tietokannassa
        userId: muokattavaUser.userId,
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        userName: newUsername,
        password: newPassword ? md5(newPassword) : muokattavaUser.password, //md5 kirjaston salaus
    }
    console.log(newUser)
    UserService.update(newUser) //kutsutaan UserService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Käyttäjän ' + newUser.firstName + '' + newUser.lastName +' muokkaus onnistui')  //tämä asettaa viestin
            setShowMessage(true) //tämä näyttää viestin
            setIsPositive(true) //tämä asettaa viestin positiiviseksi
            
            setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
                setShowMessage(false) //tämä piilottaa viestin
                setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
        },6000)

            setMuokkaustila(false) //tämä sulkee lisäyslomakkeen
        }
    })
    .catch(error => { //jos tulee virhe niin alerttiin tulee asiakkaan lisäys ei onnistunut
        //alert('Asiakkaan lisäys ei onnistunut')
        window.scrollTo(0, 0)
        setMessage('Käyttäjän muokkaus ei onnistunut') //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(false) //tämä asettaa viestin negatiiviseksi
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
        },3000)
    })      
}

return (
    <div id='addNew'>
            <h2>Käyttäjän muokkaus</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label>Etunimi</label>
                        </div>
                    <div>
                            <input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} 
                            placeholder=''/>
                    </div>
                    <div>
                        <label>Sukunimi</label>
                        </div>
                    <div>
                            <input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} 
                            placeholder=''/>
                    </div>
                    <div>
                        <label>Sähköposti</label>
                        </div>
                    <div>
                            <input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} 
                            placeholder=''/>
                    </div>
                    <div>
                        <label>Käyttöoikeus taso</label>
                        </div>
                    <div>
                            <input type='number' value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} 
                            placeholder=''/>
                    </div>
                        <div>
                                <label>Käyttäjätunnus</label>
                                </div>
                    <div>
                            <input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} 
                            placeholder=''/>
                    </div>
                        <div>
                                <label>Salasana</label>
                                </div>
                    <div>
                            <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} 
                            placeholder=''/>
                    </div>
                <br/>
                <br/>

                <input type='submit' value='Muokkaa'/>
                <input type='button' value='Peruuta' onClick={() => setMuokkaustila(false)}/>
            </form>
    </div>
)
}

export default UserEdit
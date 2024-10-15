import '../App.css'
import React, {useState} from 'react'
import CustomerService from '../services/Customer'

/** tässä tulee propsina setLisäystila jne. ja lähtee action alaspäin */
const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {
/** Tässä komponentissa on lomake, jolla voi lisätä uuden asiakkaan tietokantaan
 * const on komponentin tila
 * set on tilan muuttamismetodi
 * useState hookilla luodaan tila ja sen muuttamismetodi
 * tila on muuttuja, joka voi muuttua komponentin suorituksen aikana
 * tila voi olla esim. numero, merkkijono, taulukko tai objekti
 * useState hookilla voi luoda useita tiloja
 * tila voi olla myös boolean, joka kertoo onko lomake näkyvissä
 * tila voi olla myös viesti, joka näytetään käyttäjälle
 * tila voi olla myös taulukko, joka sisältää asiakkaat
 * tila voi olla myös objekti, joka sisältää yhden asiakkaan tiedot
 * tila voi olla myös taulukko, joka sisältää asiakkaan tilaukset
 * tila voi olla myös boolean, joka kertoo onko tilaukset näkyvissä
 * tila voi olla myös boolean, joka kertoo onko tilausten lisäys näkyvissä
 * tila voi olla myös boolean, joka kertoo onko tilausten muokkaus näkyvissä
 * tila voi olla myös boolean, joka kertoo onko tilausten poisto näkyvissä
 */

const [newCustomerId, setNewCustomerId] = useState('') //tämä kerää uuden asiakkaan tiedot joka painalluksella
const [newCompanyName, setNewCompanyName] = useState('') //ja sitten kun painetaan submit nappia niin tiedot lähetetään tietokantaan
const [newContactName, setNewContactName] = useState('') //ja tämä tyhjentää tilan
const [newContactTitle, setNewContactTitle] = useState('')

const [newCountry, setNewCountry] = useState('')
const [newAddress, setNewAddress] = useState('')
const [newCity, setNewCity] = useState('')
const [newRegion, setNewRegion] = useState('')

const [newPostalCode, setNewPostalCode] = useState('')
const [newPhone, setNewPhone] = useState('')
const [newFax, setNewFax] = useState('')

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newCustomer = { //uusi asiakasobjekti
        customerId: newCustomerId, // pitää olla samat nimet kuin tietokannassa
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        country: newCountry,
        address: newAddress,
        city: newCity,
        region: newRegion,
        postalCode: newPostalCode,
        phone: newPhone,
        fax: newFax
    }
    CustomerService.create(newCustomer) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            //alert('Asiakkaan lisäys onnistui' + newCustomer.companyName)
            setMessage('Asiakkaan lisäys onnistui ' + newCustomer.companyName) //tämä asettaa viestin
            setShowMessage(true) //tämä näyttää viestin
            setIsPositive(true) //tämä asettaa viestin positiiviseksi
            
            setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
                setShowMessage(false) //tämä piilottaa viestin
            },6000)

            setLisäystila(false) //tämä sulkee lisäyslomakkeen
        }
    })
    .catch(error => { //jos tulee virhe niin alerttiin tulee asiakkaan lisäys ei onnistunut
        //alert('Asiakkaan lisäys ei onnistunut')
        setMessage('Asiakkaan lisäys ei onnistunut') //tämä asettaa viestin
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
            <h2>Asiakkaan lisäys</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                            <input type='text' value={newCustomerId} onChange={({target}) => setNewCustomerId(target.value)} 
                            placeholder='ID with 5 capital letters' maxLength='5' minLength='5'/>
                    </div>
                    <div>
                            <input type='text' value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} 
                            placeholder='Company Name'/>
                    </div>
                    <div>
                            <input type='text' value={newContactName} onChange={({target}) => setNewContactName(target.value)} 
                            placeholder='Contact Name'/>
                    </div>
                    <div>
                            <input type='text' value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} 
                            placeholder='Contact Title'/>
                    </div>
                    <div>
                            <input type='text' value={newAddress} onChange={({target}) => setNewAddress(target.value)} 
                            placeholder='Address'/>
                    </div>
                    <div>
                            <input type='text' value={newCity} onChange={({target}) => setNewCity(target.value)} 
                            placeholder='City'/>
                    </div>
                    <div>
                            <input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} 
                            placeholder='Region'/>
                    </div>
                    <div>
                            <input type='text' value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} 
                            placeholder='Postal Code'/>
                    </div>
                    <div>
                            <input type='text' value={newCountry} onChange={({target}) => setNewCountry(target.value)} 
                            placeholder='Country'/>
                    </div>
                    <div>
                            <input type='text' value={newPhone} onChange={({target}) => setNewPhone(target.value)} 
                            placeholder='Phone'/>
                    </div>
                    <div>
                            <input type='text' value={newFax} onChange={({target}) => setNewFax(target.value)} 
                            placeholder='Fax'/>
                    </div>

                <input type='submit' value='Lisää'/>
                <input type='button' value='Peruuta' onClick={() => setLisäystila(false)}/>

            </form>
    </div>
)
}

export default CustomerAdd
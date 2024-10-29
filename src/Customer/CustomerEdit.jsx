import '../App.css'
import React, {useState} from 'react'
import CustomerService from '../services/Customer'

/** tässä tulee propsina setMuokkaustila jne. ja lähtee action alaspäin */
const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer, reload, setReload}) => {
/** Tässä muokataan tietty customer */
const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId) //tämä kerää uuden asiakkaan tiedot joka painalluksella
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName) //ja sitten kun painetaan submit nappia niin tiedot lähetetään tietokantaan
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName) //ja tämä tyhjentää tilan
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)
const [newRegion, setNewRegion] = useState(muokattavaCustomer.region)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newCustomer = { //uusi asiakasobjekti, pitää olla samat nimet kuin tietokannassa
        customerId: newCustomerId,
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
    CustomerService.update(newCustomer) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Asiakkaan ' + newCustomer.companyName +' muokkaus onnistui')  //tämä asettaa viestin
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
        setMessage('Asiakkaan muokkaus ei onnistunut') //tämä asettaa viestin
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
            <h2>Asiakkaan muokkaus</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                            <input type='text' value={newCustomerId} disabled />
                    </div>
                    <div>
                        <label>Company Name</label>
                        </div>
                    <div>
                            <input type='text' value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} 
                            placeholder='Company Name'/>
                    </div>
                    <div>
                        <label>Contact Name</label>
                        </div>
                    <div>
                            <input type='text' value={newContactName} onChange={({target}) => setNewContactName(target.value)} 
                            placeholder='Contact Name'/>
                    </div>
                    <div>
                        <label>Contact Title</label>
                        </div>
                    <div>
                            <input type='text' value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} 
                            placeholder='Contact Title'/>
                    </div>
                    <div>
                        <label>Address</label>
                        </div>
                    <div>
                            <input type='text' value={newAddress} onChange={({target}) => setNewAddress(target.value)} 
                            placeholder='Address'/>
                    </div>
                        <div>
                                <label>City</label>
                                </div>
                    <div>
                            <input type='text' value={newCity} onChange={({target}) => setNewCity(target.value)} 
                            placeholder='City'/>
                    </div>
                        <div>
                                <label>Region</label>
                                </div>
                    <div>
                            <input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} 
                            placeholder='Region'/>
                    </div>
                        <div>
                                <label>Postal Code</label>
                                </div>
                    <div>
                            <input type='text' value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} 
                            placeholder='Postal Code'/>
                    </div>
                    <div>
                        <label>Country</label>
                        </div>
                    <div>
                            <input type='text' value={newCountry} onChange={({target}) => setNewCountry(target.value)} 
                            placeholder='Country'/>
                    </div>
                        <div>
                                <label>Phone</label>
                                </div>
                    <div>
                            <input type='text' value={newPhone} onChange={({target}) => setNewPhone(target.value)} 
                            placeholder='Phone'/>
                    </div>
                        <div>
                                <label>Fax</label>
                                </div>
                    <div>
                            <input type='text' value={newFax} onChange={({target}) => setNewFax(target.value)} 
                            placeholder='Fax'/>
                    </div>

                <input type='submit' value='Muokkaa'/>
                <input type='button' value='Peruuta' onClick={() => setMuokkaustila(false)}/>

            </form>
    </div>
)
}

export default CustomerEdit
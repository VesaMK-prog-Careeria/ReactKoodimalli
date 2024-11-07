import '../App.css'
import {useState, useEffect} from 'react'
import CustomerService from '../services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [customers, setCustomer] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, setReload] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState('')

useEffect(() => { //tiedonhaku NW:n customers taulusta, useEffect hookilla haetaan tiedot kun sivu latautuu
  const token = localStorage.getItem('token') //haetaan token localstoragesta
  if (token) { //jos token on olemassa niin
    CustomerService.setToken(token); //lähetetään token CustomerServicelle
  } else {
    console.error('No token found')
    setIsPositive(false)
    setMessage('No token found')
    setShowMessage(true)
    return;
  }
  CustomerService.getAll()
    .then(customers => {
        setCustomer(customers);
        setShowCustomers(true);

    })
    .catch(error => {
      console.error('Error fetching customers', error);
      setIsPositive(false);
      setMessage('Error fetching customers');
      setShowMessage(true);
    });
},[lisäystila, reload, muokkaustila] //jos lisäystila muuttuu niin hakee uudet tiedot
);

// Hakukentän onChange tapahtumkäsittelijä
const handleSearch = (e) => {
  setShowCustomers(true)
  setSearch(e.target.value.toLowerCase())
}

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
}

  return (
    <>
        <h2> 
              <button 
                className='nappi' 
                onClick={() => setShowCustomers(!showCustomers)}>
                {!showCustomers ? 'Näytä asiakkaat' : 'Piilota asiakkaat'}
              </button>

              {!lisäystila && 
                <button 
                  className='nappi' 
                  onClick={() => setLisäystila(true)}>Lisää asiakas
                </button>}

              {lisäystila && <CustomerAdd
                setLisäystila={setLisäystila}
                setIsPositive={setIsPositive}
                setMessage={setMessage}
                setShowMessage={setShowMessage}
              />}
        </h2>
          {!lisäystila && !muokkaustila && 
                  <input 
                    type='text' 
                    placeholder='Hae asiakasta' 
                    onChange={handleSearch} value={search} />}
                  <br />
                  <br />
        {showCustomers && customers && customers.map(c =>  // loopataan customers taulukko ja tulostetaan jokainen asiakas omalle rivilleen */}
          {
            const lowerCaseName = c.companyName.toLowerCase()
            if (lowerCaseName.indexOf(search) > -1) {
              return(
          <div>
            <Customer
              key={c.customerId}
              customer={c} 
              setIsPositive={setIsPositive} 
              setMessage={setMessage} 
              setShowMessage={setShowMessage}
              setReload={setReload} 
              reload={reload} 
              editCustomer={editCustomer}
            />
            {muokkaustila && muokattavaCustomer && muokattavaCustomer.customerId === c.customerId && (
              /** Tässä renderöidään asiakkaan muokkaus suoraan showcustomers alle  */
              <CustomerEdit 
                setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} 
                setMessage={setMessage} 
                setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
              />
            )}
          </div>
          )
          }
        }
        )
        }
    </>
  )
}

export default CustomerList
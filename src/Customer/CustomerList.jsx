import '../App.css'
import React, {useState, useEffect} from 'react'
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


useEffect(() => { //tiedonhaku NW:n customers taulusta, useEffect hookilla haetaan tiedot kun sivu latautuu
  CustomerService.getAll()
    .then(data => {
        setCustomer(data)
    })
},[lisäystila, reload, muokkaustila] //jos lisäystila muuttuu niin hakee uudet tiedot
)

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
}

  return (
    <>
        {/*<h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from NW</h2>*/}
        <h2> 
              <button onClick={() => setShowCustomers(!showCustomers)}>
                {!showCustomers ? 'Näytä asiakkaat' : 'Piilota asiakkaat'}</button>
              {!lisäystila && <button className='nappi' onClick={() => setLisäystila(true)}>Lisää asiakas</button>}

              {lisäystila && <CustomerAdd
              setLisäystila={setLisäystila}
              setIsPositive={setIsPositive}
              setMessage={setMessage}
              setShowMessage={setShowMessage}
              />}
              {/* Tässä on muokkauslomake(ruudun yläreunassa), joka näkyy vain kun muokkaustilatila on true*/}
              {/* {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
              muokattavaCustomer={muokattavaCustomer}
              />} */}
        </h2>
        {/* {!lisäystila && !muokkaustila && */showCustomers && customers && customers.map(c => ( // loopataan customers taulukko ja tulostetaan jokainen asiakas omalle rivilleen */}
          <div key={c.customerId}>
            <Customer 
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
        ))}
    </>
  )
}

export default CustomerList
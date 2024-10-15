import '../App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from '../services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [customers, setCustomer] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [reload, setReload] = useState(false)


useEffect(() => { //tiedonhaku NW:n customers taulusta
  CustomerService.getAll()
    .then(data => {
        setCustomer(data)
    })
},[lisäystila, reload] //jos lisäystila muuttuu niin hakee uudet tiedot
)

  return (
    <>
        {/*<h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from NW</h2>*/}
        <h2> 
              <button onClick={() => setShowCustomers(!showCustomers)}>
                {!showCustomers ? 'Näytä asiakkaat' : 'Piilota asiakkaat'}</button>
              {!lisäystila && <button className='nappi' onClick={() => setLisäystila(true)}>Lisää asiakas</button>}

              {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
              />}
        </h2>
        {
            showCustomers && customers && customers.map(c => ( //loopataan customers taulukko ja tulostetaan jokainen asiakas omalle rivilleen
                <Customer key={c.customerId} customer={c} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setReload={setReload} reload={reload}
                /> //Customer komponentti joka saa propsina customerin ja setIsPositive, setMessage ja setShowMessage funktiot
            )
          )
        }
    </>
  )
}

export default CustomerList
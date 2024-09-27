import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'

const CustomerList = () => {

// Komponentin tilan määritys
const [customers, setCustomer] = useState([])
const [showCustomers, setShowCustomers] = useState(false)


useEffect(() => { //tiedonhaku NW:n customers taulusta
  CustomerService.getAll()
    .then(data => {
        setCustomer(data)
    })
},[]
)

  return (
    <>
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from NW</h2>
        {
            showCustomers && customers && customers.map(c => ( //loopataan customers taulukko ja tulostetaan jokainen asiakas omalle rivilleen
                <Customer key={c.customerId} customer={c} /> //Customer komponentti joka saa propsina customer olion
            )
            )
        }
    </>
  )
}

export default CustomerList
import '../App.css'
import React, {useState} from 'react'
import CustomerService from '../services/Customer'

// tässä käytetty propsia, joka on parametri, joka välitetään komponentille
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, setReload}) => { //tässä otettu propsista customer ja asetettu se muuttujaan
                                    // eli ei tarvi käyttää props.customer.companyName vaan pelkkä customer.companyName
// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = () => {
    if(window.confirm('Are you sure you want to delete ' + customer.companyName + '?')) {

    CustomerService.remove(customer.customerId)
    .then(res => {
        if(res.status === 200) {
        window.scrollTo(0, 0)
        setMessage('Customer ' + customer.companyName + ' deleted')
        setIsPositive(true)
        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
            //window.location.reload() //ei suositella lataa koko sivun uudelleen
            setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
        }, 6000)
    }
    })
    .catch(error => {
        window.scrollTo(0, 0)
        setMessage('Customer ' + customer.companyName + ' was not deleted')
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        },6000)
    })
    }
}

return (
    <div className='customerDiv'>
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {customer.companyName}
        </h4>

       {showDetails && <div className="customerDetails">
            <h3>{customer.companyName}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table>
                <div colSpan="5" style={{ textAlign: 'center' }}>
                    <button onClick={() => deleteCustomer(customer)}>Delete</button>
                    <button onClick={() => editCustomer(customer)}>Edit</button>
                </div>
            </div>}
    </div>
)
}

export default Customer
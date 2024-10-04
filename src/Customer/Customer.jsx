import '../App.css'
import React, {useState} from 'react'

// tässä käytetty propsia, joka on parametri, joka välitetään komponentille
const Customer = ({customer}) => { //tässä otettu propsista customer ja asetettu se muuttujaan
                                    // eli ei tarvi käyttää props.customer.companyName vaan pelkkä customer.companyName
// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

return (
    <div className='customerDiv'>
        
       <h4 onMouseEnter={() => setShowDetails(true)} //hiiren tullessa elementin päälle, showDetails tila muuttuu trueksi
       onMouseLeave={() => setShowDetails(false)}
       >
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
                </table></div>}
    </div>
    )
}

export default Customer
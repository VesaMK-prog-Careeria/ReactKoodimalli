import '../App.css'
import React, { useState, useEffect } from 'react'
import CustomerService from '../services/Customer'

const Customer = ({ customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, setReload }) => {
  const [visibleDetails, setVisibleDetails] = useState({})
  const [lastClickedId, setLastClickedId] = useState(null)

  const toggleDetailsVisibility = (id) => {
    setVisibleDetails((prevState) => {
      const newState = { ...prevState }

      // Jos klikataan samaa asiakasta, pelkästään togglataan näkyvyys
      if (lastClickedId === id) {
        newState[id] = !prevState[id]
      } else {
        // Piilotetaan edellinen ja näytetään nykyinen
        if (lastClickedId) {
          newState[lastClickedId] = false
        }
        newState[id] = true
      }

      return newState
    })

    setLastClickedId(id)
  }

  useEffect(() => {
    // Päivitetään tyylit edellisen ja nykyisen asiakkaan osalta
    const updateStyles = (id, isVisible) => {
      const customerElement = document.getElementById(`customerElement-${id}`)
      if (customerElement) {
        if (isVisible) {
          customerElement.style.borderBottomRightRadius = '20px'
          customerElement.style.borderBottomLeftRadius = '20px'
          customerElement.style.backgroundColor = 'grey'
          customerElement.style.color = 'black'
        } else {
          customerElement.style.borderBottomRightRadius = ''
          customerElement.style.borderBottomLeftRadius = ''
          customerElement.style.backgroundColor = ''
          customerElement.style.color = ''
        }
      }
    }

    // Päivitetään tyylit kaikille näkyville tai piilotetuille asiakkaille
    Object.keys(visibleDetails).forEach((id) => {
      updateStyles(id, visibleDetails[id])
    })
  }, [visibleDetails])

  const deleteCustomer = () => {
    if (
      window.confirm(
        'Are you sure you want to delete ' + customer.companyName + '?'
      )
    ) {
      CustomerService.remove(customer.customerId)
        .then((res) => {
          if (res.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Customer ' + customer.companyName + ' deleted')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
              setShowMessage(false)
              setReload(!reload)
            }, 6000)
          }
        })
        .catch((error) => {
          window.scrollTo(0, 0)
          setMessage('Customer ' + customer.companyName + ' was not deleted')
          setIsPositive(false)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 6000)
        })
    }
  }

  return (
    <div className='customerDiv' id={`customerElement-${customer.customerId}`}>
      <h4
        className='clicked'
        onClick={() => toggleDetailsVisibility(customer.customerId)}
      >
        {customer.companyName}
      </h4>

      {visibleDetails[customer.customerId] && (
        <div className='customerDetails'>
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
          <div style={{ textAlign: 'center' }}>
            <button id='custBtn' onClick={() => deleteCustomer(customer)}>Delete</button>
            <button id='custBtn' onClick={() => editCustomer(customer)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customer
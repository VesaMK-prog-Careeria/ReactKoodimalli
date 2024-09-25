import './App.css'
import React from 'react'

// Tässä käytetään propseja ja ainut tehtävä on palauttaa teksti ruudulle
// siksi returnin sisällä on vain <p> tagi joka tulostaa props.teksti ja statea ei käytetä
const Viesti = (props) => (

    <>
        <p>{props.teksti}</p>

    </>
  )


export default Viesti

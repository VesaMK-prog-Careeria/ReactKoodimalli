import './App.css'
import React, {useState} from 'react'


const Laskuri = (props) => {
// Komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>
        {luku < 10 && <button onClick={() => setLuku(luku + 1)}>+</button>}
        {luku > 9 && <button disabled>+</button>}
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(0)}>nollaa</button>
        <br /> <br />
        <input type='number' value={luku} onChange={(e) => setLuku(parseInt(e.target.value))} />
        <button onClick={props.huomio}>Huomio</button>

        {/* ternary operator tapa esittää ehtolause */}
        <h5>{luku > 9 ? 'Pääsit kymppiin asti!' : 'Sinulla on vielä matkaa kymppiin asti'}</h5>

    </>
  )
}

export default Laskuri

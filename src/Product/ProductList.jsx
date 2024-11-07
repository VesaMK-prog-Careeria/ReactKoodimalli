import '../App.css'
import React, {useState, useEffect} from 'react'
import ProductService from '../services/Product'
//import UserAdd from './UserAdd'
//import UserEdit from './UserEdit'

// function ja const ovat Reactin hookseja, const on uudempi tapa
const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
// Statet aina ennen useEffectia
const [products, setProducts] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, setReload] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState('')

useEffect(() => { //tiedonhaku NW:n products taulusta, useEffect hookilla haetaan tiedot kun sivu latautuu
        ProductService.getAll()
        .then(products => {
            setProducts(products)
        })
        .catch(error => {
            setIsPositive(false)
            setMessage('Error fetching products')
            setShowMessage(true)
        })
},[lisäystila, reload, muokkaustila]) //jos lisäystila muuttuu niin hakee uudet tiedot

// Hakukentän onChange tapahtumkäsittelijä
const handleSearch = (e) => {
  setSearch(e.target.value.toLowerCase())
}

// Käyttäjän poistaminen
const deleteProduct = (product) => {
    if (window.confirm('Are you sure you want to delete ' + product.productName + '?')) {
        ProductService.remove(product.productId)
        .then(() => {
            setIsPositive(true)
            setMessage('Product ' + product.productName + ' deleted')
            setShowMessage(true)
            setReload(!reload)

            setTimeout(() => {
                setShowMessage(false)
            }, 6000)
        })
        .catch(error => {
            setIsPositive(false)
            setMessage('Product ' + product.productName + ' was not deleted')
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 6000)
        })
    }
}

const editProduct = (product) => {
    setMuokkaustila(true)
    setMuokattavaProduct(product)
}

  return (
    <>
        <h2><nobr>Products from NW</nobr>
        {muokkaustila && (
            <ProductEdit
                setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive}
                setMessage={setMessage}
                setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                reload={reload}
                setReload={setReload}
            />
            )}
            {lisäystila && 
            <ProductAdd 
                setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} 
                setMessage={setMessage} 
                setShowMessage={setShowMessage} />}
            <div>
            {!lisäystila && !muokkaustila && // Piilotetaan Lisää Product -nappi, jos lisäys- tai muokkaustila on päällä
                <button 
                    className='nappi' 
                    onClick={() => setLisäystila(true)}>Lisää tuote
                </button>}
            </div>
            </h2>

            {!lisäystila && !muokkaustila && // Piilotetaan hakukenttä, jos lisäys- tai muokkaustila on päällä
            <>
                  <input 
                  type='text' 
                  placeholder='Hae tuotteen nimellä' 
                  onChange={handleSearch} 
                  value={search} 
                  />
                  <table id='userTable'>
                    <thead>
                        <tr>
                            <th>Tuotenimi</th>
                            <th>Hinta</th>
                            <th>Varastossa</th>
                            <th>Tilauksessa</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && // Taulukon generointi tuotteet tiedoista
                        products.map((p) => { // Käydään tuotteet läpi map-funktiolla
                        const lowerCaseName = p.productName.toLowerCase();
                        if (lowerCaseName.indexOf(search) > -1) {
                            return (
                            <tr key={p.productId}>
                                <td>{p.productName}</td>
                                <td>{p.unitPrice}</td>
                                <td>{p.unitsInStock}</td>
                                <td>{p.unitsOnOrder}</td>
                                <td>
                                <button onClick={() => editProduct(p)}>Edit</button>
                                </td>
                                <td>
                                <button onClick={() => deleteProduct(p)}>Delete</button>
                                </td>
                            </tr>
                            );
                        } else {
                            return null;
                        }
                        })}
                    </tbody>
                </table>
                </>
                }
    </>
    )
}

export default ProductList
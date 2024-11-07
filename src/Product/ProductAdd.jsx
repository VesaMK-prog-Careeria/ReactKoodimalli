import '../App.css'
import React, {useState} from 'react'
import ProductService from '../services/Product'

/** tässä tulee propsina setLisäystila jne. ja lähtee action alaspäin */
const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage, reload, setReload}) => {

const [newProductName, setNewProductName] = useState('')
const [newSupplierId, setNewSupplierId] = useState('')
const [newCategoryId, setNewCategoryId] = useState('')
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setNewUnitsInStock] = useState('')
const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
const [newReorderLevel, setNewReorderLevel] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)
const [newImageLink, setNewImageLink] = useState('')

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newProduct = { //uusi asiakasobjekti
        productName: newProductName,
        supplierId: newSupplierId,
        categoryId: newCategoryId,
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice,
        unitsInStock: newUnitsInStock,
        unitsOnOrder: newUnitsOnOrder,
        reorderLevel: newReorderLevel,
        discontinued: newDiscontinued,
        imageLink: newImageLink,
    }
    ProductService.create(newProduct) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Tuotteen lisäys onnistui ' + newProduct.productName) //tämä asettaa viestin
            setShowMessage(true) //tämä näyttää viestin
            setIsPositive(true) //tämä asettaa viestin positiiviseksi
            
            setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
                setShowMessage(false) //tämä piilottaa viestin
                setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
            },6000)

            setLisäystila(false) //tämä sulkee lisäyslomakkeen
        }
    })
    .catch(error => {
        window.scrollTo(0, 0)
        setMessage('Tuotteen lisäys ei onnistunut') //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(false) //tämä asettaa viestin negatiiviseksi
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
        },3000)
    })      
}

return (
    <div id='addNew'>
            <h2>Tuotteen lisäys</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                            <input type='text' value={newProductName} onChange={({target}) => setNewProductName(target.value)} 
                            placeholder='Tuotteen nimi'/>
                    </div>
                    <div>
                            <input type='text' value={newSupplierId} onChange={({target}) => setNewSupplierId(target.value)} 
                            placeholder='Toimittajan ID'/>
                    </div>
                    <div>
                            <input type='text' value={newCategoryId} onChange={({target}) => setNewCategoryId(target.value)} 
                            placeholder='Kategorian ID'/>
                    </div>
                    <div>
                            <input type='text' value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} 
                            placeholder='Määrä per yksikkö'/>
                    </div>
                    <div>
                            <input type='text' value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} 
                            placeholder='Yksikköhinta'/>
                    </div>
                    <div>
                            <input type='text' value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} 
                            placeholder='Varastossa'/>
                    </div>
                    <div>
                            <input type='text' value={newUnitsOnOrder} onChange={({target}) => setNewUnitsOnOrder(target.value)} 
                            placeholder='Tilattu'/>
                    </div>
                    <div>
                            <input type='text' value={newReorderLevel} onChange={({target}) => setNewReorderLevel(target.value)} 
                            placeholder='Tilaustaso'/>
                    </div>
                    <div>
                            <input type='text' value={newDiscontinued} disabled/>
                    </div>
                    <div>
                            <input type='text' value={newImageLink} onChange={({target}) => setNewImageLink(target.value)} 
                            placeholder='Kuvan linkki'/>
                    </div>
                    <br/>

                <input type='submit' value='Lisää'/>
                <input type='button' value='Peruuta' onClick={() => setLisäystila(false)}/>

            </form>
    </div>
)
}

export default ProductAdd
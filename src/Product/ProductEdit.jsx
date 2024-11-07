import '../App.css'
import React, {useState} from 'react'
import ProductService from '../services/Product'

/** tässä tulee propsina setLisäystila jne. ja lähtee action alaspäin */
const ProductEdit = ({setMuokkaustila, muokattavaProduct, setIsPositive, setMessage, setShowMessage, reload, setReload}) => {

const [newProductId, setNewProductId] = useState(muokattavaProduct.productId) //tämä kerää uuden asiakkaan tiedot joka painalluksella
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
const [newDiscontinued, setNewDiscontinued] = useState(false)
const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)

//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault() //estetään lomakkeen lähettäminen
    var newProduct = { //uusi asiakasobjekti
        productId: newProductId,
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
    ProductService.update(newProduct) //kutsutaan CustomerService moduulin create metodia ja lähetetään uusi asiakasobjekti
    .then(response => { //jos vastaus on 200 niin alerttiin tulee asiakkaan lisäys onnistui
        if(response.status === 200) {
            window.scrollTo(0, 0)
            setMessage('Tuotteen muokkaus onnistui ' + newProduct.productName) //tämä asettaa viestin
            setShowMessage(true) //tämä näyttää viestin
            setIsPositive(true) //tämä asettaa viestin positiiviseksi
            
            setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
                setShowMessage(false) //tämä piilottaa viestin
                setReload(!reload) //tämä lataa vain asiakkaat uudelleen (tehty CustomerList komponenttiin)
            },6000)

            setMuokkaustila(false) //tämä sulkee lisäyslomakkeen
        }
    })
    .catch(error => {
        window.scrollTo(0, 0)
        setMessage('Tuotteen muokkaus ei onnistunut') //tämä asettaa viestin
        setShowMessage(true) //tämä näyttää viestin
        setIsPositive(false) //tämä asettaa viestin negatiiviseksi
        setTimeout(() => { //3000ms jälkeen tyhjennetään tilat
            setShowMessage(false) //tämä piilottaa viestin
        },3000)
    })      
}

return (
    <div id='addNew'>
            <h2>Tuotteen muokkaus</h2>
            <form onSubmit={handleSubmit}>
                    <div>
                            <input type='text' value={newProductId} disabled />
                    </div>
                <div>
                    <label>Tuotteen nimi</label>
                </div>
                    <div>
                            <input type='text' value={newProductName} onChange={({target}) => setNewProductName(target.value)} 
                            placeholder='Tuotteen nimi'/>
                    </div>
                <div>
                    <label>Toimittajan ID</label>
                </div>
                    <div>
                            <input type='text' value={newSupplierId} onChange={({target}) => setNewSupplierId(target.value)} 
                            placeholder='Toimittajan ID'/>
                    </div>
                <div>
                    <label>Kategoria ID</label>
                </div>
                    <div>
                            <input type='text' value={newCategoryId} onChange={({target}) => setNewCategoryId(target.value)} 
                            placeholder='Kategorian ID'/>
                    </div>
                <div>
                    <label>Yksikkö määrä</label>
                </div>
                    <div>
                            <input type='text' value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} 
                            placeholder='Määrä per yksikkö'/>
                    </div>
                <div>
                    <label>Yksikköhinta</label>
                </div>
                    <div>
                            <input type='text' value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} 
                            placeholder='Yksikköhinta'/>
                    </div>
                <div>
                    <label>Varastossa</label>
                </div>
                    <div>
                            <input type='text' value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} 
                            placeholder='Varastossa'/>
                    </div>
                <div>
                    <label>Tilattu</label>
                </div>
                    <div>
                            <input type='text' value={newUnitsOnOrder} onChange={({target}) => setNewUnitsOnOrder(target.value)} 
                            placeholder='Tilattu'/>
                    </div>
                <div>
                    <label>Tilaustaso</label>
                </div>
                    <div>
                            <input type='text' value={newReorderLevel} onChange={({target}) => setNewReorderLevel(target.value)} 
                            placeholder='Tilaustaso'/>
                    </div>
                <div>
                    <label>Poistuva</label>
                </div>
                    <div>
                            <input type='text' value={newDiscontinued} disabled/>
                    </div>
                <div>
                    <label>Kuva linkki</label>
                </div>
                    <div>
                            <input type='text' value={newImageLink} onChange={({target}) => setNewImageLink(target.value)} 
                            placeholder='Kuvan linkki'/>
                    </div>
                    <br/>

                <input type='submit' value='Tallenna'/>
                <input type='button' value='Peruuta' onClick={() => setMuokkaustila(false)}/>

            </form>
    </div>
)
}

export default ProductEdit
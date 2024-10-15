import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
const baseUrl = "https://localhost:7265/api/customers"


// getAl-metodin toteutus
const getAll = () => {
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data) // tässä haetaan vain data osa vastauksesta(response)
}                                                   // response sisältää myös status koodin ja muita tietoja

const create = newCustomer => { // Useampi parametri, jos tarvitaan (newCustomer, token)
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`) //backticksit koska halutaan muuttaa id muuttuja stringiksi
}

export default { getAll, create, remove } // exportataan kaikki metodit
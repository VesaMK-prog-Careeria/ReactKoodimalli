import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
const baseUrl = "https://localhost:7265/api/Users"


// getAl-metodin toteutus
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data) // tässä haetaan vain data osa vastauksesta(response)
}                                                   // response sisältää myös status koodin ja muita tietoja

const create = newUser => { // Useampi parametri, jos tarvitaan (newCustomer, token)
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`) //backticksit koska halutaan muuttaa id muuttuja stringiksi
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object)
}

export default { getAll, create, remove, update } // exportataan kaikki metodit
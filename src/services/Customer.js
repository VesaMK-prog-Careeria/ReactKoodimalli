import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
const baseUrl = "https://localhost:7265/api/customers"

let token = null;
/** Tämä on metodi jota kutsutaanaina ennen kuin tehdään muu pyyntö serviceen
Parametrina annetaan token joka otetaan localstoragesta */ 
const setToken = newToken => {
    token = `bearer ${newToken}`;
};
// getAl-metodin toteutus
/* TODO tee cofig muillekin metodeille */
const getAll = () => {
    const config = { // tässä luodaan config objekti jossa on headeri jossa on token
        headers: { Authorization: token }, // tässä on token
    };
    const request = axios.get(baseUrl, config) // tässä käytetään config objektia
    return request.then(response => response.data) // tässä haetaan vain data osa vastauksesta(response)
}                                                   // response sisältää myös status koodin ja muita tietoja

const create = newCustomer => { // Useampi parametri, jos tarvitaan (newCustomer, token)
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`) //backticksit koska halutaan muuttaa id muuttuja stringiksi
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update, setToken } // exportataan kaikki metodit
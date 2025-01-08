import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
const baseUrl = "https://localhost:7265/api/products"
//const baseUrl = "https://nwrestapi.azurewebsites.net/api/products"

let token = null;
/** Tämä on metodi jota kutsutaanaina ennen kuin tehdään muu pyyntö serviceen
Parametrina annetaan token joka otetaan localstoragesta */ 
const setToken = newToken => {
    token = `bearer ${newToken}`;
};
// getAl-metodin toteutus
const getAll = () => {
    const config = { // tässä luodaan config objekti jossa on headeri jossa on token
        headers: { Authorization: token }, // tässä on token
    };
    const request = axios.get(baseUrl, config); // tässä käytetään config objektia
    return request.then(response => response.data); // tässä haetaan vain data osa vastauksesta(response)
};                                                   // response sisältää myös status koodin ja muita tietoja

const create = newProduct => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.delete(`${baseUrl}/${id}`, config) //backticksit koska halutaan muuttaa id muuttuja stringiksi
}

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.put(`${baseUrl}/${object.productId}`, object, config)
}

export default { getAll, create, remove, update, setToken } // exportataan kaikki metodit
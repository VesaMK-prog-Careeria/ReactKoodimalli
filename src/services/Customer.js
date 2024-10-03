import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
const baseUrl = "https://localhost:7265/api/customers"


// getAl-metodin toteutus
const getAll = () => {
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => { // Useampi parametri, jos tarvitaan (newCustomer, token)
    return axios.post(baseUrl, newCustomer)
}

export default { getAll, create } // exportataan kaikki metodit
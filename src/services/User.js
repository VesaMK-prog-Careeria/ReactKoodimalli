import axios from "axios"

// koodi mikä hakee dataa json-serveriltä (back-endiltä)
//const baseUrl = "https://localhost:7265/api/Users"
//const loginUrl = "https://localhost:7265/api/authentication"
const baseUrl = "https://nwrestapi.azurewebsites.net/api/Users"
const loginUrl = "https://nwrestapi.azurewebsites.net/api/authentication"

let token = null;
/** Tämä on metodi jota kutsutaanaina ennen kuin tehdään muu pyyntö serviceen
Parametrina annetaan token joka otetaan localstoragesta */
const setToken = newToken => {
    token = `bearer ${newToken}`
}
const Login = async (object) => {
    const response = await axios.post(loginUrl, object)
    const token = response.data.token
    setToken(token)
    localStorage.setItem('token', token);
    return response.data
}
// const Login = (object) => { // Tämä metodi ei toimi, koska se ei palauta tokenia
//     const request = axios.post(loginUrl, object)
//     return request.then(response => response.data)
// }

// getAll-metodin toteutus
const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

// create-metodin toteutus
const create = newUser => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.post(baseUrl, newUser, config)
}

// remove-metodin toteutus
const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.userId}`, object, config)
}

export default { getAll, create, remove, update, Login, setToken } // exportataan kaikki metodit
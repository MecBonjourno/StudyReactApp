import axios from 'axios';

const api = axios.create({
    baseURL: 'https://iws-recruiting-bands.herokuapp.com/api/'
})

export default api;
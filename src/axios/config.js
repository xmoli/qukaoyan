import axios from 'axios'
import StorageToken from '@/util/StorageToken'

const AUTH_TOKEN = new StorageToken().token()

const instance = axios.create({
    //baseURL: 'https://api.example.com',
    timeout: 1000,
    headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json'
    }
})
export default instance
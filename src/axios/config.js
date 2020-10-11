import axios from 'axios'

// axios.defaults.baseURL = 'https://api.example.com';

const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
if (AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios
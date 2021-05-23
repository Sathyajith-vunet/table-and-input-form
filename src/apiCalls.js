import axios from 'axios'

export function fetchUserList() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp => {
        return resp.data;
    })
    .catch((err) => {
        window.alert('API failed.')
    })
}
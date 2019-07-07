// import axios for getting data from API
import axios from 'axios';

const URL = 'http://192.168.42.213:3000';
// export action that get notes
export const fetchCategory = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(`${URL}/categories`)
    }
}

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post(`${URL}/categories`, data)
    }
}

export const removeCategory = (id) => {
    return {
        type: "REMOVE_CATEGORY",
        payload: axios.delete(`${URL}/categories/${id}`)
    }
}

// export const updateNote = (id, title, note, category) => {
//     return {
//         type: 'UPDATE_NOTES',
//         payload: axios.patch(`http://192.168.42.213:3000/notes/${id}`, {
//         	title,
//         	note,
//         	category
//         })
//     }
// }

// export const getCategory = () => {
//     return {
//         type: 'GET_NOTES',
//         payload: axios.get('https://randomuser.me/api?results=10')
//     }
// }
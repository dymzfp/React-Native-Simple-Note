// import axios for getting data from API
import axios from 'axios';


const URL = 'http://192.168.42.213:3000';
// export action that get notes
export const fetch = (page, sort = 'desc', search = '') => {
    return {
        type: 'GET_NOTES',
        payload: axios.get(`${URL}/notes?page=${page}&sort=${sort}&search=${search}`)
    }
}

export const fetchMore = (page, sort = 'desc', search = '') => {
    return {
        type: 'GET_MORE_NOTES',
        payload: axios.get(`${URL}/notes?page=${page}&sort=${sort}&search=${search}`)
    }
}

export const fetchByCategory = (page = 1, sort = 'desc', search = '', id) => {
    return {
        type: 'GET_BYCATEGORY_NOTES',
        payload: axios.get(`${URL}/notes/category/${id}?page=${page}&sort=${sort}&search=${search}`)
    }
}

export const fetchByCategoryMore = (page, sort = 'desc', search = '', id) => {
    return {
        type: 'GET_BYCATEGORY_MORE_NOTES',
        payload: axios.get(`${URL}/notes/category/${id}?page=${page}&sort=${sort}&search=${search}`)
    }
}

export const removeNote = (id) => {
    return {
        type: "REMOVE_NOTE",
        payload: axios.delete(`${URL}/notes/${id}`)
    }
}

export const addNote = (data) => {
    return {
        type: "ADD_NOTE",
        payload: axios.post(`${URL}/notes`, data)
    }
}

export const editNote = (id, data) => {
    return {
        type: "EDIT_NOTE",
        payload: axios.patch(`${URL}/notes/${id}`, data)
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
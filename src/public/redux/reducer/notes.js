const initialState = {
    number: 10,
    data: [],
    isLoading: false,
    isLoadingMore: false,
    isLoadingProses: false,
    isFinish: false,
    isError: false,
    totalPage: 0,
    typeAction: 'get',
    getMode: true,
    categorySelect: ''
}

// create a reducer for getting network from RESTful API
export default notes = (state = initialState, action) => {
    switch(action.type){
        case 'GET_NOTES_PENDING': // in case when loading get data
            return {
                isLoading: true,
                typeAction: 'get',
                getMode: true
            }
        case 'GET_NOTES_REJECTED': // in case error network/else
            return {
                isLoading: false,
                isError: true,
                typeAction: 'get',
                getMode: true
            }
        case 'GET_NOTES_FULFILLED': // in case successfuly get data
            return {
                isLoading: false,
                isError: false,
                typeAction: 'get',
                data: action.payload.data.data,
                totalPage: action.payload.data.totalPage,
                getMode: true
            }

        case 'GET_MORE_NOTES_PENDING': // in case when loading get data
            return {
                ...state,
                isLoadingMore: true,
                typeAction: 'get',
                getMode: true
            }
        case 'GET_MORE_NOTES_REJECTED': // in case error network/else
            return {
                ...state,
                isLoadingMore: false,
                isError: true,
                typeAction: 'get',
                getMode: true
            }
        case 'GET_MORE_NOTES_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoadingMore: false,
                isError: false,
                data: [...state.data].concat(action.payload.data.data),
                totalPage: action.payload.data.totalPage,
                typeAction: 'get',
                getMode: true
            }

        /// REMOVE NOTE ------------------
        case 'REMOVE_NOTE_PENDING':
        return {
            ...state,
            isLoadingProses: true,
            typeAction: 'delete'
        }
        case 'REMOVE_NOTE_FULFILLED':
        return {
            ...state,
            isLoadingProses: false,
            isFinish: true,
            typeAction: 'delete',
            data: state.data.filter(note => note._id !== action.payload.data._id)
        }
        case 'REMOVE_NOTE_REJECTED':
        return {
            ...state,
            isLoadingProses: false,
            typeAction: 'delete',
            isError: true
        } 

        /// ADD NOTE ------------------
        case 'ADD_NOTE_PENDING':
        return {
            ...state,
            isLoadingProses: true,
            typeAction: 'post'
        }
        case 'ADD_NOTE_FULFILLED':
        return {
            ...state,
            isLoadingProses: false,
            isFinish: true,
            isError: false,
            typeAction: 'post',
            data: [action.payload.data.data].concat(state.data)
        }
        case 'ADD_NOTE_REJECTED':
        return {
            ...state,
            isLoadingProses: false,
            isError: true,
            typeAction: 'post'
        }

        case 'EDIT_NOTE_PENDING':
        return {
            ...state,
            isLoadingProses: true,
            typeAction: 'patch'
        }
        case 'EDIT_NOTE_FULFILLED':
        return {
            ...state,
            isLoadingProses: false,
            isFinish: true,
            typeAction: 'patch',
            data: state.data.map(note => 
                (note._id == action.payload.data.data._id) ? 
                    action.payload.data.data : note
            )
        }
        case 'EDIT_NOTE_REJECTED':
        return {
            ...state,
            isLoadingProses: false,
            isError:true,
            typeAction: 'patch'
        }

        case 'GET_BYCATEGORY_NOTES_PENDING': // in case when loading get data
            return {
                isLoading: true,
                typeAction: 'get',
                getMode: false
            }
        case 'GET_BYCATEGORY_NOTES_REJECTED': // in case error network/else
            return {
                isLoading: false,
                isError: true,
                typeAction: 'get',
                getMode: false
            }
        case 'GET_BYCATEGORY_NOTES_FULFILLED': // in case successfuly get data
            return {
                isLoading: false,
                isError: false,
                typeAction: 'get',
                data: action.payload.data.data,
                totalPage: action.payload.data.totalPage,
                getMode: false,
            }

        case 'GET_BYCATEGORY_MORE_NOTES_PENDING': // in case when loading get data
            return {
                ...state,
                isLoadingMore: true,
                typeAction: 'get',
                getMode: false
            }
        case 'GET_BYCATEGORY_MORE_NOTES_REJECTED': // in case error network/else
            return {
                ...state,
                isLoadingMore: false,
                isError: true,
                typeAction: 'get',
                getMode: false
            }
        case 'GET_BYCATEGORY_MORE_NOTES_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoadingMore: false,
                isError: false,
                data: [...state.data].concat(action.payload.data.data),
                totalPage: action.payload.data.totalPage,
                typeAction: 'get',
                getMode: false,
            }

        // example when updating/deleting and not getting all notes again
        // case 'UPDATE_NOTE_FULFILLED':
        //     return {
        //         isLoading: false,
        //         isError: false,
        //         data: {
        //             ...state, // get all previous state

                    // deleting from array
                    // data: state.data.filter(note => {
                        // note.login.username !== action.payload.data // when deleting
                    // })

                    // updating array
                    // data: state.data.map((item, index) => {
                    //     if(item.login.username === action.payload.data.login.username ){
                    //         item = action.paypload.data // change note to newest one
                    //     }
                    //     return item;
                    // })
            //     }
            // }

        default:
            return state;
    }
}
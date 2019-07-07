const initialState = {
    number: 10,
    data: [],
    results: [],
    isLoading: true,
    isError: false,
    isLoadingProses: false,
    isFinish: false,
}

// create a reducer for getting network from RESTful API
export default categories = (state = initialState, action) => {
    switch(action.type){
        case 'GET_CATEGORIES_PENDING': // in case when loading get data
            return {
                isLoading: true
            }
        case 'GET_CATEGORIES_REJECTED': // in case error network/else
            return {
                isLoading: false,
                isError: true,
            }
        case 'GET_CATEGORIES_FULFILLED': // in case successfuly get data
            return {
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }

        case 'ADD_CATEGORY_PENDING':
        return {
            ...state,
            isLoadingProses: true,
        }
        case 'ADD_CATEGORY_FULFILLED':
        return {
            ...state,
            isLoadingProses: false,
            isFinish: true,
            isError: false,
            data: [action.payload.data.data].concat(state.data)
        }
        case 'ADD_CATEGORY_REJECTED':
        return {
            ...state,
            isLoadingProses: false,
            isError: true,
            isFinish: true,
        }

        case 'REMOVE_CATEGORY_PENDING':
        return {
            ...state,
            isLoadingProses: true,
            typeAction: 'delete'
        }
        case 'REMOVE_CATEGORY_FULFILLED':
        return {
            ...state,
            isLoadingProses: false,
            isFinish: true,
            typeAction: 'delete',
            data: state.data.filter(note => note._id !== action.payload.data._id)
        }
        case 'REMOVE_CATEGORY_REJECTED':
        return {
            ...state,
            isLoadingProses: false,
            typeAction: 'delete',
            isError: true
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
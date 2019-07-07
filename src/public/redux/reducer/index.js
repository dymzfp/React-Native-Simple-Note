import { combineReducers } from 'redux';

// import all reducers
import categories from './categories'
import notes from './notes';

// combine them
const appReducer = combineReducers({
    notes,
    categories
})

export default appReducer;
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import Reducer from './reducer';

const logger = createLogger({});

const store = createStore(
    Reducer,
    applyMiddleware(
        logger,
        promiseMiddleware
    )
);

export default store;
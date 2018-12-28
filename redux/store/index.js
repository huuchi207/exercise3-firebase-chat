import {createStore, applyMiddleware} from 'redux';
// import from 'redux-thunk'
import reducer from '../reducer/CombineReducers';

const store = createStore(
    reducer,
    {},
);

export default store;
import {combineReducers, createStore} from 'redux';
import appState from './reducers/appState';

let configureStore = () => {
    return createStore(combineReducers({appState}));
};

export default configureStore;

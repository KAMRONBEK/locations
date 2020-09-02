import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appState from './reducers/appState';
import mapState from './reducers/mapState';
import searchState from './reducers/searchState';
import listState from './reducers/listState';
import scrollViewState from './reducers/scrollViewState';
import descState from './reducers/descState';

let configureStore = () => {
    return createStore(
        combineReducers({
            appState,
            mapState,
            searchState,
            listState,
            scrollViewState,
            descState,
        }),
        applyMiddleware(thunk),
    );
};

export default configureStore;

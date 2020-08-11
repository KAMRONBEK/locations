import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appState from './reducers/appState';
import mapState from './reducers/mapState';
import searchState from './reducers/searchState';
import dragPanelState from './reducers/dragPanelState';
import scrollViewState from './reducers/scrollViewState';

let configureStore = () => {
    return createStore(
        combineReducers({
            appState,
            mapState,
            searchState,
            dragPanelState,
            scrollViewState,
        }),
        applyMiddleware(thunk),
    );
};

export default configureStore;

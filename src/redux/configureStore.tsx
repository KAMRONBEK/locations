import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appState from './reducers/appState';
import mapState from './reducers/mapState';
import searchState from './reducers/searchState';
import listState from './reducers/listState';
import scrollViewState from './reducers/scrollViewState';
import descState from './reducers/descState';
import calloutState from './reducers/calloutState';
import createFlipperDebugger from 'redux-flipper';

let middlewaresToApply = [];

middlewaresToApply.push(thunk);

if (__DEV__) {
    //developer mode only
    // const createFlipperDebugger = require('redux-flipper').default;
    // middlewaresToApply.push(createFlipperDebugger());
}

let middleware = applyMiddleware(...middlewaresToApply);

let configureStore = () => {
    return createStore(
        combineReducers({
            appState,
            mapState,
            searchState,
            listState,
            scrollViewState,
            descState,
            calloutState,
        }),
        middleware,
    );
};

export default configureStore;

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appState from './reducers/appState';
import mapState from './reducers/mapState';
import searchState from './reducers/searchState';
import listState from './reducers/listState';
import scrollViewState from './reducers/scrollViewState';
import descState from './reducers/descState';
import createFlipperDebugger from 'redux-flipper';

let middlewaresToApply = [];

if (__DEV__) {
    console.log('dev');

    // const createFlipperDebugger = require('redux-flipper').default;
    middlewaresToApply.push(createFlipperDebugger());
    middlewaresToApply.push(thunk);
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
        }),
        middleware,
    );
};

export default configureStore;

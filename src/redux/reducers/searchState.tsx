import {
    SET_SEARCH_STATUS,
    SET_SEARCH_RESULT_TEXT,
    SET_SEARCH_RESULT_LIST,
    SET_SEARCH_KEYWORD,
} from '../types';
import {INITIAL} from '../../constants';

export interface searchStateProps {
    // edit
}

const initialState = {
    searchStatus: INITIAL, //searching, done_searching, initial
    searchResultText: '',
    searchResultList: [],
    searchKeyword: '',
};
export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SET_SEARCH_KEYWORD:
            console.log(payload);
            return {...state, searchKeyword: payload};
        case SET_SEARCH_STATUS:
            return {...state, searchStatus: payload};
        case SET_SEARCH_RESULT_TEXT:
            return {...state, searchResultText: payload};
        case SET_SEARCH_RESULT_LIST: {
            return {...state, searchResultList: payload};
        }
        default:
            return state;
    }
};

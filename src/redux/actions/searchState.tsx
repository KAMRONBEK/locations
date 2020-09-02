import {
    SET_SEARCH_STATUS,
    SET_SEARCH_RESULT_TEXT,
    SET_SEARCH_RESULT_LIST,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_FOCUS,
} from '../types';

export const setSearchKeyword = (payload) => ({
    type: SET_SEARCH_KEYWORD,
    payload,
});

export const setSearchStatus = (payload) => ({
    type: SET_SEARCH_STATUS,
    payload,
});

export const setSearchResultText = (payload) => ({
    type: SET_SEARCH_RESULT_TEXT,
    payload,
});

export const setSearchRelustList = (payload) => ({
    type: SET_SEARCH_RESULT_LIST,
    payload,
});

export const setSearchFocus = (payload) => ({
    type: SET_SEARCH_FOCUS,
    payload,
});

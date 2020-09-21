import {
    SET_SEARCH_STATUS,
    SET_SEARCH_RESULT_TEXT,
    SET_SEARCH_RESULT_LIST,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_FOCUS
} from '../types';

export const setSearchKeyword = (payload: any) => ({
    type: SET_SEARCH_KEYWORD,
    payload
});

export const setSearchStatus = (payload: any) => ({
    type: SET_SEARCH_STATUS,
    payload
});

export const setSearchResultText = (payload: any) => ({
    type: SET_SEARCH_RESULT_TEXT,
    payload
});

export const setSearchRelustList = (payload: any) => ({
    type: SET_SEARCH_RESULT_LIST,
    payload
});

export const setSearchFocus = (payload: any) => ({
    type: SET_SEARCH_FOCUS,
    payload
});

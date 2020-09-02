import {HIDE_MAP_LOADING, TOGGLE_LIST, SHOW_LIST, HIDE_LIST} from '../types';

export const showList = () => ({
    type: SHOW_LIST,
    // payload,
});

export const hideList = () => ({
    type: HIDE_LIST,
});

export const toggleList = () => ({
    type: TOGGLE_LIST,
});

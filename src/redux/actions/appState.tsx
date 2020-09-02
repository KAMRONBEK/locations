import {
    SHOW_FLASH_MESSAGE,
    SHOW_MAP_LOADING,
    HIDE_MAP_LOADING,
    TOGGLE_MENU,
    SET_LANGUAGE,
} from '../types';

export const showFlashMessage = (payload: any) => ({
    type: SHOW_FLASH_MESSAGE,
    payload,
});

export const showMapLoading = () => ({
    type: SHOW_MAP_LOADING,
});

export const hideMapLoading = () => ({
    type: HIDE_MAP_LOADING,
});

export const toggleMenu = () => ({
    type: TOGGLE_MENU,
});

export const setLanguage = (payload) => ({
    type: SET_LANGUAGE,
    payload,
});

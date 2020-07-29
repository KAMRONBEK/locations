import {SHOW_FLASH_MESSAGE, SHOW_MAP_LOADING, HIDE_MAP_LOADING} from '../types';

export const showFlashMessage = (payload) => ({
    type: SHOW_FLASH_MESSAGE,
    payload,
});

export const showMapLoading = () => ({
    type: SHOW_MAP_LOADING,
});

export const hideMapLoading = () => ({
    type: HIDE_MAP_LOADING,
});

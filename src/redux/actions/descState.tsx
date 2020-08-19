import {SHOW_DESCRIPTION, HIDE_DESCRIPTION} from '../types';

export const showDescription = (payload) => ({
    type: SHOW_DESCRIPTION,
    payload,
});

export const hideDescription = () => ({
    type: HIDE_DESCRIPTION,
});

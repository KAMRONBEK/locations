import {
    SHOW_DRAGGABLE_PANEL,
    HIDE_MAP_LOADING,
    HIDE_DRAGGABLE_PANEL,
} from '../types';

export const showPanel = () => ({
    type: SHOW_DRAGGABLE_PANEL,
    // payload,
});

export const hidePanel = () => ({
    type: HIDE_DRAGGABLE_PANEL,
});

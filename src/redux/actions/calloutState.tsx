import {HIDE_CALLOUT, SHOW_CALLOUT} from '../types';

export const showCallout = (payload: any) => ({
    type: SHOW_CALLOUT,
    payload,
});

export const hideCallout = () => ({
    type: HIDE_CALLOUT,
});

import {regionSelected, showDescription, hideList} from '../actions';

export const cardPressed = (region) => (dispatch) => {
    dispatch(hideList());

    dispatch(regionSelected(region));

    dispatch(showDescription(region));
};

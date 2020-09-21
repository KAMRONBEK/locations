import {branchType} from '../../screens/map/Map';
import {regionSelected, showDescription, hideList} from '../actions';

export const cardPressed = (region: branchType) => (dispatch: any) => {
    dispatch(hideList());

    dispatch(regionSelected(region));

    dispatch(showDescription(region));
};

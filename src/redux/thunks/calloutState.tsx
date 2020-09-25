import {branchType} from '../../screens/map/Map';
import {hideCallout, showDescription} from '../actions';

export const onCalloutPress = (region: branchType) => (dispatch: any) => {
    dispatch(showDescription(region));
    dispatch(hideCallout());
};

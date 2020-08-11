import Service from '../../services/service';
import {showMapLoading, hideMapLoading} from '../actions';
import {
    setOriginalData,
    setDisplayData,
    setMyRegion,
} from '../actions/mapState';
import {Platform} from 'react-native';
import {requestLocationPermission} from '../../services/functions';
import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../../constants';

/**
 * Draggable list
 */
// const pointSelected = (point) => (dispatch) => {
//     dispatch(map.moveToPoint(point));
//     dispatch(search.disableSearch());
//     return {type: POINT_SELECTED, payload: point};
// };

// export const animateToMarkerId(markerid) => (dispatch) => {
// 	return {
// 		type: ANIMATE_TO_MARKER_ID,
// 		payload: markerid
// 	};
// }

export const init = () => async (dispatch) => {
    dispatch(showMapLoading());
    try {
        let result = await Service.get();
        // console.log(result);
        dispatch(setOriginalData(result));
        dispatch(setDisplayData(result));
        if (Platform.OS == 'android') {
            requestLocationPermission();
        }
        Geolocation.getCurrentPosition((info) => {
            dispatch(
                setMyRegion({
                    ...info.coords,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }),
            );
        });
    } catch (error) {
        console.log(error, 'in LoadOriginalData');
    } finally {
        dispatch(hideMapLoading());
    }
};

export const loadingData = () => async (dispatch) => {
    dispatch(showMapLoading());
    try {
    } catch (err) {
        console.log(err, 'in LoadOriginalData');
    } finally {
        dispatch(hideMapLoading());
    }
};

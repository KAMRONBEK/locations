import Service from '../../services/service';
import {showMapLoading, hideMapLoading, showDescription} from '../actions';
import {
    setOriginalData,
    setDisplayData,
    setMyRegion,
    setDestinationCoords,
    setMapMode,
    markerSelected,
} from '../actions/mapState';
import {Platform} from 'react-native';
import {
    requestLocationPermission,
    getCurrentPosition,
} from '../../services/functions';
import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA, MAP_WITH_DESC} from '../../constants';
import Polyline from '@mapbox/polyline';
import {loadPartialConfig} from '@babel/core';

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

    let myPosition;
    let myLocation;
    try {
        if (Platform.OS == 'android') {
            try {
                let granted = await requestLocationPermission();
                myPosition = await getCurrentPosition();
                myLocation = myPosition.coords;
                dispatch(
                    setMyRegion({
                        ...myLocation,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }),
                );
                let result = await Service.get(myLocation);
                dispatch(setOriginalData(result));
                dispatch(setDisplayData(result));
            } catch (e) {
                // not permitted
            }
        }
        // let myPosition = await getCurrentPosition();
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

export const getDirections = (startLocation, endLocation) => async (
    dispatch,
) => {
    dispatch(showMapLoading());

    let start = startLocation.latitude + ',' + startLocation.longitude;
    let end = endLocation.latitude + ',' + endLocation.longitude;
    try {
        let resp = await fetch(
            //fix API
            `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=AIzaSyAbI94kGVXviZKmvBCLkNj4zkxX5MilzUM`,
        );
        let respJson = await resp.json();
        console.log(respJson);
        let points = Polyline.decode(
            respJson.routes[0].overview_polyline.points,
        );
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1],
            };
        });
        dispatch(setDestinationCoords(coords));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(hideMapLoading());
    }
};

export const markerPressed = (mapEvent) => (dispatch, getState) => {
    let region;
    let markerID = parseFloat(mapEvent._targetInst.return.key.split('$')[1]);

    region = getState().mapState.displayDataList.filter((item) => {
        if (item.id == markerID) {
            return item;
        }
    });
    console.log(region[0]);

    dispatch(showDescription(region[0]));
    dispatch(setMapMode(MAP_WITH_DESC));
    dispatch(setDestinationCoords(null));
    dispatch(markerSelected(mapEvent));
};

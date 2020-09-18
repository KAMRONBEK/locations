import Service from '../../services/service';
import {
    showMapLoading,
    hideMapLoading,
    showDescription,
    setOriginalData,
    setDisplayData,
    setMyRegion,
    setDestinationCoords,
    setMapMode,
    markerSelected,
    regionSelected,
} from '../actions';
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
            let granted = requestLocationPermission();
        } else {
            Geolocation.requestAuthorization();
        }
        myPosition = await getCurrentPosition();
        console.log(typeof myPosition);
        myLocation = myPosition.coords;
        const myLocationRegion = {
            ...myLocation,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        dispatch(setMyRegion(myLocationRegion));
        let result = await Service.get(myLocation);
        if (result) {
            dispatch(setOriginalData(result));
            dispatch(setDisplayData(result));
        }
    } catch (error) {
        console.log(error, 'in init Android');
        let result = await Service.get(null);
        dispatch(setOriginalData(result));
        dispatch(setDisplayData(result));
    } finally {
        dispatch(hideMapLoading());
    }
};

// export const populateCategoriesAsync = (id) => (dispatch) => {
//     let str = !id ? '' : '/' + id;
//     return api.category
//         .get(str)
//         .then((res) => {
//             dispatch(categoriesLoaded(res.data));
//             return res;
//         })
//         .catch(({data}) => dispatch(serverError(data)));
// };

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
        console.log(error, 'direction');
    } finally {
        dispatch(hideMapLoading());
    }
};

export const markerPressed = (mapEvent) => (dispatch, getState) => {
    console.log('marker press');

    let region;
    let markerID = parseFloat(mapEvent._targetInst.return.key.split('$')[1]);

    region = getState().mapState.displayDataList.filter((item) => {
        if (item.id == markerID) {
            return item;
        }
    });

    dispatch(showDescription(region[0]));

    dispatch(regionSelected(region[0]));

    dispatch(setDestinationCoords(null));

    // dispatch(markerSelected(mapEvent));
};

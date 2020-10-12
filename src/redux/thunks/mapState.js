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
    showCallout,
    hideCallout
} from '../actions';
import {Alert, Linking, Platform} from 'react-native';
import {
    requestLocationPermission,
    getCurrentPosition
} from '../../services/functions';
import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA, MAP_WITH_DESC} from '../../constants';
import Polyline from '@mapbox/polyline';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';

export const init = () => async (dispatch) => {
    dispatch(hideCallout());
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
            longitudeDelta: LONGITUDE_DELTA
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
    dispatch
) => {
    dispatch(showMapLoading());

    let start = startLocation.latitude + ',' + startLocation.longitude;
    let end = endLocation.latitude + ',' + endLocation.longitude;
    try {
        let resp = await fetch(
            //fix API
            `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=AIzaSyAbI94kGVXviZKmvBCLkNj4zkxX5MilzUM`
        );
        let respJson = await resp.json();
        console.log(respJson);
        let points = Polyline.decode(
            respJson.routes[0].overview_polyline.points
        );
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1]
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

    dispatch(regionSelected(region[0]));

    dispatch(showCallout(region[0]));

    dispatch(setDestinationCoords(null));

    // dispatch(markerSelected(mapEvent));
};

const loadLocationInfo = async (dispatch) =>
    new Promise(async (resolve, reject) => {
        let myPosition;
        let myLocation;
        myPosition = await getCurrentPosition();
        console.log(myPosition);
        myLocation = myPosition.coords;
        const myLocationRegion = {
            ...myLocation,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
        if (myLocationRegion) {
            resolve(myLocationRegion);
        } else {
            reject('not found');
        }
    });

export const focusRegion = () => async (dispatch) => {
    dispatch(hideCallout());
    try {
        if (Platform.OS == 'android') {
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)'
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log(
                                'The permission has not been requested / is denied but requestable'
                            );
                            // request(
                            // PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                            // ).then(() => {
                            loadLocationInfo().then((info) => {
                                console.log(info, 'info');
                                dispatch(setMyRegion(info));
                                dispatch(regionSelected(info));
                            });
                            // });
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            loadLocationInfo().then((info) => {
                                console.log(info, 'info');
                                dispatch(regionSelected(info));
                            });

                            break;
                        case RESULTS.BLOCKED:
                            console.log(
                                'The permission is denied and not requestable anymore'
                            );
                            Alert.alert(
                                'Location',
                                'Location is denied, Open Settings?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () =>
                                            console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => Linking.openSettings()
                                    }
                                ],
                                {cancelable: false}
                            );
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
        } else {
            check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)'
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log(
                                'The permission has not been requested / is denied but requestable',
                                request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(
                                    () => {
                                        loadLocationInfo().then((info) => {
                                            console.log(info, 'info');
                                            dispatch(setMyRegion(info));
                                            dispatch(regionSelected(info));
                                        });
                                    }
                                )
                            );
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            loadLocationInfo().then((info) => {
                                console.log(info, 'info');
                                dispatch(regionSelected(info));
                            });
                            break;
                        case RESULTS.BLOCKED:
                            console.log(
                                'The permission is denied and not requestable anymore'
                            );
                            Alert.alert(
                                'Location',
                                'Location is denied, Open Settings?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () =>
                                            console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => Linking.openSettings()
                                    }
                                ],
                                {cancelable: false}
                            );
                            break;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    } catch (error) {}
};

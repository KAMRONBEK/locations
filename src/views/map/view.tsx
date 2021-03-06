import React, {useCallback, useEffect, useRef, memo} from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import styles from './styles';
import MapView from 'react-native-map-clustering';
import mapType, {
    PROVIDER_GOOGLE,
    Callout,
    CalloutSubview,
    Marker
} from 'react-native-maps';
import {connect} from 'react-redux';
import {
    colors,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    MAP_WITH_SEARCH,
    DIRECTION_API_KEY
} from '../../constants';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    mapDragStarted,
    setMapMode,
    hideDescription,
    showMapLoading,
    hideMapLoading,
    setZoomLevel,
    setSearchFocus,
    hideCallout
} from '../../redux/actions';
import {markerPressed} from '../../redux/thunks';
import MapViewDirections from 'react-native-maps-directions';
import Bank from '../../assets/vectors/Bank';
import Branch from '../../assets/vectors/Branch';
import Atm from '../../assets/vectors/Atm';
import LocationPin from '../../assets/vectors/Marker';
import {branchType} from '../../screens/map/Map';
import LinearGradient from 'react-native-linear-gradient';

const Map = ({
    myRegion,
    displayDataList,
    panelVisibility,
    focusRegion,
    mapDragStarted,
    markerPressed,
    setMapMode,
    mapMode,
    hideDescription,
    routeDestination,
    showMapLoading,
    hideMapLoading,
    setDestinationCoords,
    mapPressed,
    showDescription,
    zoomLevel,
    setZoomLevel,
    descVis,
    mapType
}: any) => {
    let branchMarkers = useCallback(() => {
        return (
            displayDataList &&
            displayDataList.map((region: branchType, index: number) => (
                <Marker
                    onPress={markerPressed}
                    key={region.id}
                    tracksViewChanges={false}
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}
                    // icon={
                    //     region.type == 'branch'
                    //         ? images.branch
                    //         : region.type == 'atm'
                    //         ? images.atm
                    //         : images.bank
                    // }
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            padding: 10,
                            paddingTop: 4,
                            alignItems: 'center',
                            height: 45,
                            width: 45,
                            overflow: 'hidden'
                        }}>
                        {/* {region.type == 'branch' ? (
                            <Branch height={40} width={40} />
                        ) : region.type == 'atm' ? (
                            <Atm height={40} width={40} />
                        ) : (
                            <Bank height={40} width={40} />
                        )} */}
                        {/* <LocationPin height={40} width={40} /> */}
                        <Image
                            source={images.pin}
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: colors.dimGreen
                            }}
                        />
                    </View>

                    <Callout
                        tooltip={true}
                        style={{
                            width: 0
                        }}
                    />
                </Marker>
            ))
        );
    }, [displayDataList]);

    const _map = useRef<mapType>(null);

    const onMapPress = (mapEvent: any) => {
        if (mapEvent.nativeEvent.action !== 'marker-press') {
            mapPressed();
            console.log('map pressed');
            Keyboard.dismiss();
        } else {
        }
    };

    const onMapReady = () => {
        // console.log('mapready');
    };

    const onDirecionStart = () => {
        showMapLoading();
    };

    const onDirectionReady = (result: any) => {
        console.log(result.distance, 'km', result.duration, 'min');
        hideMapLoading();
    };

    useEffect(() => {
        console.log('marker pressed');

        if (focusRegion !== null && _map.current) {
            _map.current.animateToRegion(
                {
                    latitude: focusRegion?.latitude,
                    longitude: focusRegion?.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                },
                1200
            );
        }
    }, [focusRegion]);

    useEffect(() => {
        if (_map.current) {
            _map.current.fitToCoordinates(displayDataList, {
                edgePadding: {
                    top: 60,
                    left: 40,
                    right: 40,
                    bottom: 60
                },
                animated: true
            });
        }
    }, [displayDataList]);

    useEffect(() => {
        console.log(zoomLevel);
    }, [zoomLevel]);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={myRegion}
                style={styles.map}
                showsUserLocation={true}
                showsCompass={false}
                animationEnabled={true}
                clusteringEnabled={true}
                onRegionChangeComplete={(event) =>
                    setZoomLevel(event.longitudeDelta)
                }
                mapType={mapType}
                radius={40}
                edgePadding={{top: 150, left: 50, bottom: 150, right: 50}}
                customMapStyle={mapConfig}
                layoutAnimationConf={{
                    duration: 700,
                    create: {
                        type: 'spring',
                        springDamping: 0.5,
                        property: 'opacity'
                    },
                    update: {
                        type: 'spring',
                        springDamping: 0.7,
                        property: 'opacity'
                    }
                }}
                ref={_map}
                showsBuildings={true}
                onClusterPress={(cluster, markers) => {}}
                clusterColor={colors.dimGreen}
                showsMyLocationButton={false}
                onPress={onMapPress}
                onPanDrag={mapDragStarted}
                onMarkerDragEnd={(data) => console.log(data)}
                showsIndoorLevelPicker={true}
                onMapReady={onMapReady}>
                {branchMarkers()}
                {myRegion && routeDestination && (
                    <MapViewDirections
                        origin={myRegion}
                        destination={routeDestination}
                        mode={'DRIVING'}
                        precision={'high'}
                        apikey={DIRECTION_API_KEY}
                        strokeWidth={4}
                        strokeColor={colors.blue}
                        onStart={onDirecionStart}
                        onReady={onDirectionReady}
                        splitWaypoints={true}
                        region={'uz'}
                    />
                )}
            </MapView>
            <LinearGradient
                colors={[colors.dimGreen, 'transparent']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.gradient}
            />
        </View>
    );
};

const mapStateToProps = ({mapState, listState, descState}: any) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    panelVisibility: listState.panelVisibility,
    focusRegion: mapState.focusRegion,
    mapMode: mapState.mapMode,
    routeDestination: mapState.routeDestination,
    zoomLevel: mapState.zoomLevel,
    descVis: descState.descVisibility,
    mapType: mapState.mapType
});

const mapDispatchToProps = (dispatch: any) => ({
    // hidePanel: () => dispatch(hidePanel()),
    mapDragStarted: () => {
        dispatch(mapDragStarted());
        dispatch(hideCallout());
    },
    markerPressed: (mapEvent: any) => dispatch(markerPressed(mapEvent)),
    showMapLoading: () => dispatch(showMapLoading()),
    hideMapLoading: () => dispatch(hideMapLoading()),
    mapPressed: (state: any) => {
        dispatch(hideDescription());
        dispatch(hideCallout());
        dispatch(setSearchFocus(false));
    },
    setZoomLevel: (delta: any) => {
        dispatch(setZoomLevel(delta));
    }
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
})(memo(Map));

import React, {useCallback, useEffect, useRef} from 'react';
import {View, Text, LayoutAnimation, Keyboard} from 'react-native';
import styles from './styles';
import MapView from 'react-native-map-clustering';
import mapType, {
    PROVIDER_GOOGLE,
    Marker,
    Polyline,
    Callout,
} from 'react-native-maps';
import {connect} from 'react-redux';
import {
    colors,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    FREE_MAP,
    MAP_WITH_LIST,
    MAP_WITH_SEARCH,
    DIRECTION_API_KEY,
    MAP_WITH_DESC,
} from '../../constants';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    mapDragStarted,
    setMapMode,
    hideDescription,
    showMapLoading,
    hideMapLoading,
    setDestinationCoords,
    showDescription,
} from '../../redux/actions';
import {markerPressed} from '../../redux/thunks';
import MapViewDirections from 'react-native-maps-directions';
import Bank from '../../assets/vectors/Bank';
import Branch from '../../assets/vectors/Branch';
import Atm from '../../assets/vectors/Atm';

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
}: any) => {
    let branchMarkers =
        // useCallback(
        () => {
            return (
                displayDataList &&
                displayDataList.map((region, index) => (
                    <Marker
                        onPress={markerPressed}
                        key={region.id}
                        tracksViewChanges={false}
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                        }}
                        // icon={
                        //     region.type == 'branch'
                        //         ? images.branch
                        //         : region.type == 'atm'
                        //         ? images.atm
                        //         : images.bank
                        // }
                        title={region.name}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {region.type == 'branch' ? (
                                <Branch
                                    height={25}
                                    width={25}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            ) : region.type == 'atm' ? (
                                <Atm
                                    height={25}
                                    width={25}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            ) : (
                                <Bank
                                    height={25}
                                    width={25}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            )}
                        </View>
                        <Callout tooltip={true}>
                            <View style={styles.callout}>
                                <Text
                                    numberOfLines={3}
                                    style={styles.calloutText}>
                                    {region.type == 'branch' ? (
                                        <Branch
                                            height={25}
                                            width={25}
                                            style={{
                                                height: 25,
                                                width: 25,
                                            }}
                                        />
                                    ) : region.type == 'atm' ? (
                                        <Atm
                                            height={25}
                                            width={25}
                                            style={{
                                                height: 25,
                                                width: 25,
                                            }}
                                        />
                                    ) : (
                                        <Bank
                                            height={25}
                                            width={25}
                                            style={{
                                                height: 25,
                                                width: 25,
                                            }}
                                        />
                                    )}
                                    {region.name} {region.id}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))
            );
        };
    // , [displayDataList]);

    const _map = useRef<mapType>(null);

    useEffect(() => {
        console.log(mapMode, 'mapState');
    }, [mapMode]);

    const onMapPress = () => {
        console.log(mapMode, 'mapState');
        Keyboard.dismiss();
        mapPressed(MAP_WITH_SEARCH);
    };

    const onMapReady = () => {
        console.log('mapready');
    };

    const onDirecionStart = () => {
        showMapLoading();
    };

    const onDirectionReady = (result) => {
        console.log(result.distance, 'km', result.duration, 'min');
        hideMapLoading();
    };

    useEffect(() => {
        if (focusRegion !== null && _map.current) {
            _map.current.animateToRegion(
                {
                    latitude: focusRegion?.latitude,
                    longitude: focusRegion?.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
                1200,
            );
        }
    }, [focusRegion]);

    useEffect(() => {
        if (_map.current) {
            _map.current.fitToCoordinates(displayDataList, {
                edgePadding: {
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20,
                },
                animated: true,
            });
        }
    }, [displayDataList]);

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
                radius={30}
                // customMapStyle={mapConfig}
                layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
                ref={_map}
                showsBuildings={true}
                clusterColor={colors.lightBlue}
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
                        precision={'low'}
                        apikey={DIRECTION_API_KEY}
                        strokeWidth={8}
                        strokeColor={colors.blue}
                        onStart={onDirecionStart}
                        onReady={onDirectionReady}
                    />
                )}
            </MapView>
        </View>
    );
};

const mapStateToProps = ({mapState, listState}: any) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    panelVisibility: listState.panelVisibility,
    focusRegion: mapState.focusRegion,
    mapMode: mapState.mapMode,
    routeDestination: mapState.routeDestination,
});

const mapDispatchToProps = (dispatch) => ({
    hidePanel: () => dispatch(hidePanel()),
    mapDragStarted: () => dispatch(mapDragStarted()),
    markerPressed: (mapEvent) => dispatch(markerPressed(mapEvent)),
    showMapLoading: () => dispatch(showMapLoading()),
    hideMapLoading: () => dispatch(hideMapLoading()),
    mapPressed: (state) => {
        dispatch(hideDescription());
        dispatch(setMapMode(state));
    },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Map);
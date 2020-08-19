import React, {useCallback, useEffect, useRef} from 'react';
import {View, Text, LayoutAnimation} from 'react-native';
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
    MAP_WITH_CARD_INFO,
    MAP_WITH_SEARCH,
    DIRECTION_API_KEY,
} from '../../constants';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    hidePanel,
    mapDragStarted,
    markerPressed,
    mapPressed,
    setMapState,
    hideDescription,
    showMapLoading,
    hideMapLoading,
    setDestinationCoords,
} from '../../redux/actions';
import MapViewDirections from 'react-native-maps-directions';

const Map = ({
    myRegion,
    displayDataList,
    panelVisibility,
    focusRegion,
    mapDragStarted,
    markerPressed,
    mapPressed,
    mapMode,
    hideDescription,
    dirCoordinates,
    endLocation,
    showMapLoading,
    hideMapLoading,
    setDestinationCoords,
}: any) => {
    let branchMarkers = useCallback(() => {
        return (
            displayDataList &&
            displayDataList.map((region, index) => (
                <Marker
                    onPress={markerPressed}
                    key={index}
                    style={{
                        width: 15,
                        height: 15,
                    }}
                    tracksViewChanges={false}
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    icon={
                        region.type == 'branch'
                            ? images.branch
                            : region.type == 'atm'
                            ? images.atm
                            : images.bank
                    }
                    title={region.name}>
                    <Callout tooltip={true}>
                        <View style={styles.callout}>
                            <Text numberOfLines={3} style={styles.calloutText}>
                                {region.name}
                            </Text>
                        </View>
                    </Callout>
                </Marker>
            ))
        );
    }, [displayDataList]);

    const _map = useRef<mapType>(null);

    useEffect(() => {
        console.log(mapMode, 'mapState');
    }, [mapMode]);

    const onMapPress = () => {
        console.log(mapMode, 'mapState');
        if (mapMode == FREE_MAP) {
            mapPressed(MAP_WITH_CARD_INFO);
        } else {
            mapPressed(FREE_MAP);
        }
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
                customMapStyle={mapConfig}
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
                {myRegion && endLocation && (
                    <MapViewDirections
                        origin={myRegion}
                        destination={endLocation}
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

const mapStateToProps = ({mapState, dragPanelState}: any) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    panelVisibility: dragPanelState.panelVisibility,
    focusRegion: mapState.focusRegion,
    mapMode: mapState.mapMode,
    dirCoordinates: mapState.dirCoordinates,
    endLocation: mapState.endLocation,
});

const mapDispatchToProps = (dispatch) => ({
    hidePanel: () => dispatch(hidePanel()),
    mapDragStarted: () => dispatch(mapDragStarted()),
    markerPressed: (mapEvent) => {
        dispatch(mapPressed(MAP_WITH_CARD_INFO));
        dispatch(setDestinationCoords(null));
        dispatch(markerPressed(mapEvent));
    },
    showMapLoading: () => dispatch(showMapLoading()),
    hideMapLoading: () => dispatch(hideMapLoading()),
    mapPressed: (state) => {
        dispatch(hideDescription());
        dispatch(mapPressed(state));
    },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Map);

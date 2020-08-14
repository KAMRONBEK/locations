import React, {useCallback, useEffect, useRef} from 'react';
import {View, LayoutAnimation} from 'react-native';
import styles from './styles';
import MapView from 'react-native-map-clustering';
import mapType, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {
    colors,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    FREE_MAP,
    MAP_WITH_CARD_INFO,
} from '../../constants';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    hidePanel,
    mapDragStarted,
    markerPressed,
    mapPressed,
} from '../../redux/actions';
import mapState from '../../redux/reducers/mapState';

const Map = ({
    myRegion,
    displayDataList,
    panelVisibility,
    focusRegion,
    mapDragStarted,
    markerPressed,
    mapPressed,
    mapMode,
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
                    title={region.name}
                />
            ))
        );
    }, [displayDataList]);

    const _map = useRef<mapType>(null);

    const animateToRegion = useCallback(() => {
        if (_map.current) {
            _map.current.animateToRegion(myRegion, 1000);
        }
    }, [myRegion]);

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
    useEffect(() => {
        console.log(panelVisibility);
    }, [panelVisibility]);
    console.log('focusRegion', focusRegion);
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
        // setRegionSelected((old) => {
        // 	if(focusRegion && old !== focusRegion) {
        // 		console.log(focusRegion);
        //
        // 	}
        // 	return focusRegion;
        // });
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
                clusterColor={colors.blue}
                showsMyLocationButton={false}
                onPress={onMapPress}
                onPanDrag={mapDragStarted}
                onMarkerDragEnd={(data) => console.log(data)}
                showsIndoorLevelPicker={true}>
                {branchMarkers()}
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
});

const mapDispatchToProps = (dispatch) => ({
    hidePanel: () => dispatch(hidePanel()),
    mapDragStarted: () => dispatch(mapDragStarted()),
    markerPressed: (mapEvent) => dispatch(markerPressed(mapEvent)),
    mapPressed: (state) => dispatch(mapPressed(state)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Map);

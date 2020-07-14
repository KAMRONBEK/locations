import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    LayoutAnimation,
    PermissionsAndroid,
    ScrollView,
    Platform,
    TextInput,
} from 'react-native';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    LATITUDE,
    LONGITUDE,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    colors,
    deviceHeight,
    CARD_WIDTH,
    CARD_HEIGHT,
} from '../../constants';
import Service from '../../services/service';
import {getCurrentLocation} from '../../services/functions';
import FilterItem from '../../component/common/FilterItem';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Map = () => {
    let [currentRegion, setCurrentRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    let [branchList, setBranchList] = useState([]);
    let [minibankList, setMinibankList] = useState([]);
    let [atmList, setAtmList] = useState([]);

    const onLocationPress = () => {
        getCurrentLocation(setCurrentRegion);
        animateToRegion();
    };

    useEffect(() => {
        getCurrentLocation(setCurrentRegion);
        animateToRegion();

        Service.get()
            .then((res) => {
                setBranchList(res.branches);
                setAtmList(res.atms);
                setMinibankList(res.minibanks);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);

    //markers
    let branchMarkers = useCallback(() => {
        return branchList.map((region, index) => (
            <Marker
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
                icon={images.branch}
                title={region.name}>
                {/* <Image source={images.branch} style={styles.marker} /> */}
            </Marker>
        ));
    }, [branchList]);

    let atmMarkers = useCallback(() => {
        return atmList.map((region, index) => (
            <Marker
                key={index}
                tracksViewChanges={false}
                coordinate={{
                    latitude: region.longitude,
                    longitude: region.latitude,
                }}
                icon={images.atm}
                title={region.name}>
                {/* <Image source={images.atm} style={styles.marker} /> */}
            </Marker>
        ));
    }, [atmList]);
    let minibankMarkers = useCallback(() => {
        return minibankList.map((region, index) => (
            <Marker
                key={index}
                tracksViewChanges={false}
                coordinate={{
                    latitude: region.longitude,
                    longitude: region.latitude,
                }}
                icon={images.bank}
                title={region.name}>
                {/* <Image source={images.bank} style={styles.marker} /> */}
            </Marker>
        ));
    }, [minibankList]);

    //example
    let _map = useRef(null);

    const animateToRegion = useCallback(() => {
        _map.current.animateToRegion(currentRegion, 500);
    }, [currentRegion]);

    // const _onMapReady = () => {
    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     ).then((granted) => {
    //         setMapMargin(0);
    //     });
    // };

    return (
        <View style={styles.container}>
            <MapView
                showsUserLocation={true}
                layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
                animationEnabled={true}
                ref={_map}
                style={[styles.map]}
                provider={PROVIDER_GOOGLE}
                initialRegion={currentRegion}
                showsMyLocationButton={true}
                clusteringEnabled={true}
                radius={20}
                customMapStyle={mapConfig}
                // onMapReady={_onMapReady}
            >
                {/* <Marker coordinate={currentRegion} title={'my location'}>
                    <Image
                        source={images.currentLocation}
                        style={{
                            height: 20,
                            width: 20,
                        }}
                    />
                </Marker> */}
                {branchMarkers()}
                {atmMarkers()}
                {minibankMarkers()}
            </MapView>
            <View style={styles.markerWrapper}>
                <TouchableOpacity onPress={onLocationPress}>
                    <View style={styles.locationIcon}>
                        <Ionicons name="locate-outline" size={24} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: -1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    onMapContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 40,
    },
    markerWrapper: {
        bottom: 18,
        right: 18,
        position: 'absolute',
        backgroundColor: colors.ultraLightBlue,
        borderColor: colors.gray,
        borderRadius: 5,
        borderWidth: 0.5,
        marginBottom: CARD_HEIGHT,
    },
    marker: {
        margin: 10,
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    locationIcon: {
        padding: 8,
    },
});
export default Map;

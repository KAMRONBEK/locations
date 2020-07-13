import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {
    LATITUDE,
    LONGITUDE,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
} from '../../constants';
import Service from '../../services/service';
import {getCurrentLocation} from '../../services/functions';

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
                // style={styles.marker}
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
                style={styles.marker}
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
                style={styles.marker}
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
    let mapRef = useRef(null);

    const animateToRegion = useCallback(() => {
        mapRef.current.animateToRegion(currentRegion, 500);
    }, [currentRegion]);

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={currentRegion}
                // region={currentRegion}
                clusteringEnabled={true}
                radius={70}
                customMapStyle={mapConfig}>
                <Marker coordinate={currentRegion} title={'me'} style={{}}>
                    <Image
                        source={images.currentLocation}
                        style={{
                            height: 15,
                            width: 15,
                            paddingBottom: 15,
                        }}
                    />
                </Marker>
                {branchMarkers()}
                {atmMarkers()}
                {minibankMarkers()}
            </MapView>
            <View style={styles.markerWrapper}>
                <TouchableOpacity onPress={onLocationPress}>
                    <Image style={styles.marker} source={images.marker} />
                </TouchableOpacity>
            </View>
        </>
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
        bottom: 40,
        right: 40,
        position: 'absolute',
        backgroundColor: 'rgba(200,200,200,0.9)',
        borderRadius: 4,
    },
    marker: {
        margin: 10,
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
});
export default Map;

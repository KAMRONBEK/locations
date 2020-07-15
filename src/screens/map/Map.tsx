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
    Animated,
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
    SPACING_FOR_CARD_INSET,
} from '../../constants';
import Service from '../../services/service';
import {getCurrentLocation} from '../../services/functions';
import FilterItem from '../../component/common/FilterItem';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarkerCard from '../../component/common/MarkerCard';

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

    const _map = useRef(null);
    const _scrollView = useRef(null);

    const animateToRegion = useCallback(() => {
        _map.current.animateToRegion(currentRegion, 500);
    }, [currentRegion]);
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
        return atmList.map((region, index) => {
            return (
                <Marker
                    onPress={(e) => onMarkerPress(e)}
                    key={index}
                    tracksViewChanges={false}
                    coordinate={{
                        latitude: region.longitude,
                        longitude: region.latitude,
                    }}
                    icon={images.atm}
                    // opacity={parseFloat(opacity)}
                    title={region.name}>
                    {/* <Image source={images.atm} style={styles.marker} /> */}
                </Marker>
            );
        });
    }, [atmList]);
    let minibankMarkers = useCallback(() => {
        return minibankList.map((region, index) => (
            <Marker
                // cluster={false}
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

    // const _onMapReady = () => {
    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     ).then((granted) => {
    //         setMapMargin(0);
    //     });
    // };

    //for animation
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    const regionTimeout = useRef(false);

    const mapAnimationListener = ({value}) => {
        let index = Math.floor(value / (CARD_WIDTH + 20)); // animate 30% away from landing on the next item

        if (index >= atmList.length) {
            index = atmList.length - 1;
        }
        if (index <= 0) {
            index = 0;
        }

        if (regionTimeout.current !== false)
            clearTimeout(regionTimeout.current);

        regionTimeout.current = setTimeout(() => {
            if (mapIndex !== index) {
                mapIndex = index;
                const {latitude, longitude} = atmList[index];
                _map.current.animateToRegion(
                    {
                        latitude: longitude,
                        longitude: latitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    1200,
                );
            }
        }, 10);
    };

    const onMarkerPress = (mapEventData) => {
        let temper = {
            _dispatchInstances: {
                _debugHookTypes: null,
                _debugID: 16147,
                _debugIsCurrentlyTiming: false,
                _debugNeedsRemount: false,
                _debugOwner: {
                    _debugHookTypes: null,
                    _debugID: 16095,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugOwner: '[FiberNode]',
                    _debugSource: [Object],
                    actualDuration: 1,
                    actualStartTime: 14595,
                    alternate: '[FiberNode]',
                    child: ' [Circular]',
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 1,
                    elementType: '[Function MapMarker]',
                    expirationTime: 0,
                    firstEffect: '[Circular]',
                    index: 5,
                    key: '.1:$3',
                    lastEffect: ' [Circular]',
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    ref: null,
                    return: '[FiberNode]',
                    selfBaseDuration: 1,
                    sibling: null,
                    stateNode: '[MapMarker]',
                    tag: 1,
                    treeBaseDuration: 1,
                    type: '[Function MapMarker]',
                    updateQueue: [Object],
                },
                _debugSource: {
                    columnNumber: 7,
                    fileName:
                        'D:\\PlayGround\\Ipak Yoli\\LocationApp\\node_modules\\react-native-maps\\lib\\components\\MapMarker.js',
                    lineNumber: 335,
                },
                actualDuration: 0,
                actualStartTime: 14596,
                alternate: {
                    _debugHookTypes: null,
                    _debugID: 16147,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugOwner: '[FiberNode]',
                    _debugSource: [Object],
                    actualDuration: 0,
                    actualStartTime: 14628,
                    alternate: ' [Circular]',
                    child: null,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 132,
                    elementType: 'AIRMapMarker',
                    expirationTime: 0,
                    firstEffect: null,
                    index: 0,
                    key: null,
                    lastEffect: null,
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    selfBaseDuration: 0,
                    sibling: null,
                    tag: 5,
                    treeBaseDuration: 0,
                    type: 'AIRMapMarker',
                    updateQueue: null,
                },
                child: null,
                childExpirationTime: 0,
                dependencies: null,
                effectTag: 132,
                elementType: 'AIRMapMarker',
                expirationTime: 0,
                firstEffect: null,
                index: 0,
                key: null,
                lastEffect: null,
                memoizedProps: {
                    coordinate: [Object],
                    icon:
                        'http://localhost:8081/assets/src/assets/images/atm-marker.png?platform=android&hash=83db9067f85a26f2bb99481076f20f19',
                    image: undefined,
                    stopPropagation: false,
                    style: [Array],
                    title: 'ATM Le Grand Plaza',
                    tracksViewChanges: false,
                },
                memoizedState: null,
                mode: 8,
                nextEffect: null,
                pendingProps: {
                    coordinate: [Object],
                    icon:
                        'http://localhost:8081/assets/src/assets/images/atm-marker.png?platform=android&hash=83db9067f85a26f2bb99481076f20f19',
                    image: undefined,
                    stopPropagation: false,
                    style: [Array],
                    title: 'ATM Le Grand Plaza',
                    tracksViewChanges: false,
                },
                return: {
                    _debugHookTypes: null,
                    _debugID: 16095,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 1,
                    actualStartTime: 14595,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 1,
                    expirationTime: 0,
                    index: 5,
                    key: '.1:$3',
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    ref: null,
                    selfBaseDuration: 1,
                    sibling: null,
                    tag: 1,
                    treeBaseDuration: 1,
                    updateQueue: [Object],
                },
                selfBaseDuration: 0,
                sibling: null,
                stateNode: {
                    _children: [Array],
                    _nativeTag: 957,
                    viewConfig: [Object],
                },
                tag: 5,
                treeBaseDuration: 0,
                type: 'AIRMapMarker',
                updateQueue: null,
            },
            _targetInst: {
                _debugHookTypes: null,
                _debugID: 16147,
                _debugIsCurrentlyTiming: false,
                _debugNeedsRemount: false,
                _debugOwner: {
                    _debugHookTypes: null,
                    _debugID: 16095,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 1,
                    actualStartTime: 14595,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 1,
                    elementType: 1,
                    expirationTime: 0,
                    index: 5,
                    key: '.1:$3',
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    ref: null,
                    selfBaseDuration: 1,
                    sibling: null,
                    tag: 1,
                    treeBaseDuration: 1,
                    updateQueue: [Object],
                },
                _debugSource: {
                    columnNumber: 7,
                    fileName:
                        'D:\\PlayGround\\Ipak Yoli\\LocationApp\\node_modules\\react-native-maps\\lib\\components\\MapMarker.js',
                    lineNumber: 335,
                },
                actualDuration: 0,
                actualStartTime: 14596,
                alternate: {
                    _debugHookTypes: null,
                    _debugID: 16147,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 0,
                    actualStartTime: 14628,
                    child: null,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 132,
                    elementType: 'AIRMapMarker',
                    expirationTime: 0,
                    firstEffect: null,
                    index: 0,
                    key: null,
                    lastEffect: null,
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    selfBaseDuration: 0,
                    sibling: null,
                    tag: 5,
                    treeBaseDuration: 0,
                    type: 'AIRMapMarker',
                    updateQueue: null,
                },
                child: null,
                childExpirationTime: 0,
                dependencies: null,
                effectTag: 132,
                elementType: 'AIRMapMarker',
                expirationTime: 0,
                firstEffect: null,
                index: 0,
                key: null,
                lastEffect: null,
                memoizedProps: {
                    coordinate: [Object],
                    icon:
                        'http://localhost:8081/assets/src/assets/images/atm-marker.png?platform=android&hash=83db9067f85a26f2bb99481076f20f19',
                    image: undefined,
                    stopPropagation: false,
                    style: [Array],
                    title: 'ATM Le Grand Plaza',
                    tracksViewChanges: false,
                },
                memoizedState: null,
                mode: 8,
                nextEffect: null,
                pendingProps: {
                    coordinate: [Object],
                    icon:
                        'http://localhost:8081/assets/src/assets/images/atm-marker.png?platform=android&hash=83db9067f85a26f2bb99481076f20f19',
                    image: undefined,
                    stopPropagation: false,
                    style: [Array],
                    title: 'ATM Le Grand Plaza',
                    tracksViewChanges: false,
                },
                return: {
                    _debugHookTypes: null,
                    _debugID: 16095,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 1,
                    actualStartTime: 14595,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 1,
                    expirationTime: 0,
                    index: 5,
                    key: '.1:$3',
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    ref: null,
                    selfBaseDuration: 1,
                    sibling: null,
                    updateQueue: [Object],
                },
                selfBaseDuration: 0,
                sibling: null,
                stateNode: {
                    _children: [Array],
                    _nativeTag: 957,
                    viewConfig: [Object],
                },
                tag: 5,
                treeBaseDuration: 0,
                type: 'AIRMapMarker',
                updateQueue: null,
            },
            bubbles: undefined,
            cancelable: undefined,
            currentTarget: {
                _children: [],
                _internalFiberInstanceHandleDEV: {
                    _debugHookTypes: null,
                    _debugID: 16147,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 0,
                    actualStartTime: 14596,
                    child: null,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 132,
                    elementType: 'AIRMapMarker',
                    expirationTime: 0,
                    firstEffect: null,
                    index: 0,
                    key: null,
                    lastEffect: null,
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    selfBaseDuration: 0,
                    sibling: null,
                    tag: 5,
                    treeBaseDuration: 0,
                    type: 'AIRMapMarker',
                    updateQueue: null,
                },
                _nativeTag: 957,
                viewConfig: {
                    Commands: [Object],
                    NativeProps: [Object],
                    bubblingEventTypes: undefined,
                    directEventTypes: [Object],
                    uiViewClassName: 'AIRMapMarker',
                    validAttributes: [Object],
                },
            },
            defaultPrevented: undefined,
            dispatchConfig: {registrationName: 'onPress'},
            eventPhase: undefined,
            isTrusted: undefined,
            nativeEvent: {
                action: 'marker-press',
                coordinate: {
                    latitude: 41.3109357458093,
                    longitude: 69.2862862808413,
                },
                id: null,
                position: {x: 390, y: 453},
            },
            target: {
                _children: [],
                _internalFiberInstanceHandleDEV: {
                    _debugHookTypes: null,
                    _debugID: 16147,
                    _debugIsCurrentlyTiming: false,
                    _debugNeedsRemount: false,
                    _debugSource: [Object],
                    actualDuration: 0,
                    actualStartTime: 14596,
                    child: null,
                    childExpirationTime: 0,
                    dependencies: null,
                    effectTag: 132,
                    elementType: 'AIRMapMarker',
                    expirationTime: 0,
                    firstEffect: null,
                    index: 0,
                    key: null,
                    lastEffect: null,
                    memoizedProps: [Object],
                    memoizedState: null,
                    mode: 8,
                    nextEffect: null,
                    pendingProps: [Object],
                    ref: '[Function ref]',
                    return: '[FiberNode]',
                    selfBaseDuration: 0,
                    sibling: null,
                    stateNode: '[Circular]',
                    tag: 5,
                    treeBaseDuration: 0,
                    type: 'AIRMapMarker',
                    updateQueue: null,
                },
                _nativeTag: 957,
                viewConfig: {
                    Commands: [Object],
                    NativeProps: [Object],
                    bubblingEventTypes: undefined,
                    directEventTypes: [Object],
                    uiViewClassName: 'AIRMapMarker',
                    validAttributes: [Object],
                },
            },
            timeStamp: 1594806638783,
            type: undefined,
        };

        const markerID = parseFloat(
            mapEventData._targetInst.return.key.split('$')[1],
        );

        let x = markerID * CARD_WIDTH + markerID * 20;
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    };

    const interpolations = atmList.map((region, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];

        const opacity = mapAnimation.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
        });

        return {opacity};
    });

    useEffect(() => {
        const id = mapAnimation.addListener(mapAnimationListener);
        return () => mapAnimation.removeListener(id);
    });

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
                radius={30}
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
            <View style={styles.searchbar}>
                <TextInput
                    placeholder={strings.searchHere}
                    autoCapitalize="none"
                    style={{flex: 1, padding: 0}}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentInset={{
                    // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20,
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0,
                }}>
                <FilterItem text={strings.atm} key={'1'} />
                <FilterItem text={strings.branches} key={'2'} />
                <FilterItem text={strings.minibanks} key={'3'} />
            </ScrollView>

            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal:
                        Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: true},
                )}>
                {!!branchList &&
                    atmList.map((region, index) => {
                        return <MarkerCard key={index} {...region} />;
                    })}
            </Animated.ScrollView>
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
    searchbar: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        backgroundColor: colors.white,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    filterScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
export default Map;

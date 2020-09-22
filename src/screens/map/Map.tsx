import mapType, {
    PROVIDER_GOOGLE,
    Marker,
    MapViewProps,
} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    RefObject,
} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    LayoutAnimation,
    PermissionsAndroid,
    Platform,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    ScrollView,
    InteractionManager,
    ScrollViewComponent,
    ViewProps,
    ScrollViewProps,
    SectionList,
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
import {
    // getCurrentLocation,
    requestLocationPermission,
} from '../../services/functions';
import FilterItem from '../../component/common/FilterItem';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarkerCard from '../../component/common/MarkerCard';
import Text from '../../component/common/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SearchBar from '../../component/common/SearchBar';
import {showMapLoading, hideMapLoading} from '../../redux/actions';
import {connect} from 'react-redux';
import {act} from 'react-test-renderer';

export interface branchType {
    id: string;
    name: string;
    address: string;
    location: string;
    mfo: string;
    bank: string;
    phone: string[];
    trial503: string;
    latitude: number;
    longitude: number;
    type: 'atm' | 'branch' | 'minibanks';
    tag: string;
    distance: number;
}

export interface regionType {
    latitude: number;
    longitude: number;
}

const Map = ({showMapLoading, hideMapLoading, appState}: any) => {
    let [currentRegion, setCurrentRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    let [branchList, setBranchList] = useState<branchType[]>([]);
    let [orignialBranchList, setOriginalBranchList] = useState([]);
    let [searchList, setSearchList] = useState([]);

    const _map = useRef<mapType>(null);
    const _scrollView = useRef<ScrollView>(null);
    const _draggablePanel = useRef<SlidingUpPanel>(null);

    const animateToRegion = useCallback(() => {
        if (_map.current) {
            _map.current.animateToRegion(currentRegion, 500);
        }
    }, [currentRegion]);

    const onLocationPress = () => {
        // getCurrentLocation(setCurrentRegion);
        animateToRegion();
    };

    //markers
    let branchMarkers = useCallback(() => {
        return (
            branchList &&
            branchList.map((region, index) => (
                <Marker
                    onPress={(e) => onMarkerPress(e)}
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
                    {/* <Image source={images.branch} style={styles.marker} /> */}
                </Marker>
            ))
        );
    }, [branchList]);

    //for animation
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    const regionTimeout: any = useRef();

    let draggableValue = new Animated.Value(0);
    const mapAnimationListener = ({value}: any) => {
        let index = Math.floor(value / (CARD_WIDTH + 20)); // animate 20 pixel away from landing on the next item

        if (index >= branchList.length) {
            index = branchList.length - 1;
        }

        if (index <= 0) {
            index = 0;
        }

        if (regionTimeout.current) clearTimeout(regionTimeout.current);
        console.log('map animation');

        regionTimeout.current = setTimeout(() => {
            if (mapIndex !== index) {
                mapIndex = index;
                const {latitude, longitude} = branchList[index];
                if (_map.current) {
                    _map.current.animateToRegion(
                        {
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        },
                        1200,
                    );
                }
            }
        }, 10);
    };

    useEffect(() => {
        const id = mapAnimation.addListener(mapAnimationListener);
        return () => mapAnimation.removeListener(id);
    }, []);

    const onMarkerPress = (mapEventData: any) => {
        const markerID = parseFloat(
            mapEventData._targetInst.return.key.split('$')[1],
        );

        let x = markerID * CARD_WIDTH + markerID * 20;
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }
        if (_scrollView.current) {
            _scrollView.current.scrollTo({x: x, y: 0, animated: true});
        }
        if (_draggablePanel.current) {
            _draggablePanel.current.show();
        }
    };

    const interpolations =
        branchList &&
        branchList.map((region, index) => {
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
        if (_draggablePanel.current) {
            _draggablePanel.current.show({
                toValue: CARD_HEIGHT + 60,
                velocity: 0.1,
            });
        }
        // InteractionManager.runAfterInteractions(() => {
        showMapLoading();
        if (Platform.OS == 'android') {
            requestLocationPermission();
        }
        // getCurrentLocation(setCurrentRegion);
        animateToRegion();
        Service.get()
            .then((res: any) => {
                act(() => setBranchList(res));
                act(() => setOriginalBranchList(res));
                // setAtmList(res.atms);
                // setMinibankList(res.minibanks);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                hideMapLoading();
            });
        // });
    }, []);

    //search
    return (
        <View style={styles.container}>
            <MapView
                // userLocationUpdateInterval={10000}
                // userLocationPriority={'passive'}
                showsUserLocation={true}
                layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
                animationEnabled={true}
                ref={_map}
                showsBuildings={true}
                style={[styles.map]}
                provider={PROVIDER_GOOGLE}
                initialRegion={currentRegion}
                clusteringEnabled={true}
                radius={30}
                customMapStyle={mapConfig}
                showsMyLocationButton={false}
                showsCompass={false}
                showsIndoorLevelPicker={true}
                onPanDrag={() => {
                    if (_draggablePanel.current) {
                        _draggablePanel.current.hide();
                    }
                }}>
                {branchMarkers()}
            </MapView>
            <View style={styles.content}>
                <View style={styles.top}>
                    <View style={styles.searchbarWrapper}>
                        <SearchBar
                            searchData={orignialBranchList}
                            onSearch={setBranchList}
                            searchResultList={branchList}
                            mapRef={_map}
                            slidePanelRef={_draggablePanel}
                        />
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
                        <FilterItem
                            onPress={() => {}}
                            text={strings.atm}
                            key={'1'}
                        />
                        <FilterItem
                            onPress={() => {}}
                            text={strings.branches}
                            key={'2'}
                        />
                        <FilterItem
                            onPress={() => {}}
                            text={strings.minibanks}
                            key={'3'}
                        />
                    </ScrollView>
                </View>
                <SlidingUpPanel
                    ref={_draggablePanel}
                    draggableRange={{
                        top: CARD_HEIGHT + 60,
                        bottom: CARD_HEIGHT / 2 + 40,
                    }}
                    minimumVelocityThreshold={100}
                    height={CARD_HEIGHT + 60}
                    snappingPoints={[CARD_HEIGHT / 3 + 60]}
                    showBackdrop={true}
                    allowMomentum={true}
                    backdropOpacity={0.1}
                    friction={0.7}
                    animatedValue={draggableValue}>
                    <View style={styles.footer}>
                        <View style={styles.markerWrapper}>
                            <TouchableOpacity onPress={onLocationPress}>
                                <View style={styles.locationIcon}>
                                    <Ionicons
                                        name="locate-outline"
                                        size={24}
                                        color={colors.lightBlue}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

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
                                    Platform.OS === 'android'
                                        ? SPACING_FOR_CARD_INSET
                                        : 0,
                            }}
                            onScroll={() => {
                                Animated.event(
                                    [
                                        {
                                            nativeEvent: {
                                                contentOffset: {
                                                    x: mapAnimation,
                                                },
                                            },
                                        },
                                    ],
                                    {useNativeDriver: false},
                                );
                            }}>
                            {!!branchList &&
                                branchList.map((region, index) => {
                                    return (
                                        <MarkerCard
                                            onPress={() => {
                                                if (_map.current) {
                                                    _map.current.animateToRegion(
                                                        {
                                                            latitude:
                                                                region.latitude,
                                                            longitude:
                                                                region.longitude,
                                                            latitudeDelta: LATITUDE_DELTA,
                                                            longitudeDelta: LONGITUDE_DELTA,
                                                        },
                                                        1200,
                                                    );
                                                }
                                            }}
                                            key={index}
                                            {...region}
                                        />
                                    );
                                })}
                        </Animated.ScrollView>
                    </View>
                </SlidingUpPanel>
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
    marker: {
        margin: 10,
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    top: {},
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    searchbarWrapper: {
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        width: '90%',
        alignSelf: 'center',
    },

    filterScrollView: {
        // position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
        display: 'none',
    },
    footer: {
        paddingBottom: 10,
    },
    markerWrapper: {
        // position: 'absolute',
        alignSelf: 'flex-end',
        right: 10,
        // top: -40,
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderRadius: 40,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    locationIcon: {
        padding: 8,
    },
    scrollView: {
        paddingVertical: 10,
        marginBottom: 10,
    },
});

const mapStateToProps = ({appState}: any) => ({appState});

const mapDispatchToProps = {
    showMapLoading,
    hideMapLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

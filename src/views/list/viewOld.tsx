import React, {useEffect, forwardRef, useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, Platform} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
    CARD_HEIGHT,
    CARD_WIDTH,
    SPACING_FOR_CARD_INSET,
    colors,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    MAP_WITH_DESC,
    BORDER_RADIUS,
} from '../../constants';
import styles from './styles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
    setMyRegion,
    regionSelected,
    showPanel,
    showDescription,
    setMapMode,
    toggleList,
} from '../../redux/actions';
import MarkerCard from '../../component/common/MarkerCard';
import {getDirections} from '../../redux/thunks';

const List = ({
    myRegion,
    displayData,
    panelVisibility,
    regionSelected,
    setMyRegion,
    pressedMarkerId,
    showPanel,
    showDescription,
    setMapMode,
    endLocation,
    getDirections,
    toggleList,
}) => {
    let draggableValue = new Animated.Value(0);
    let mapAnimation = new Animated.Value(0);

    const _scrollView = useRef<ScrollView>(null);
    const _draggablePanel = useRef<SlidingUpPanel>(null);

    let [listVisibility, setListVisibility] = useState(false);

    useEffect(() => {
        let x = pressedMarkerId * CARD_WIDTH + pressedMarkerId * 20;
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }
        if (_draggablePanel.current) {
            _draggablePanel.current.show();
        }
        if (_scrollView.current) {
            _scrollView.current.scrollTo({x: x, y: 0, animated: true});
        }
    }, [pressedMarkerId]);

    const toggler = () => {
        setListVisibility(!listVisibility);
    };

    useEffect(() => {
        console.log(listVisibility);
        if (listVisibility) {
            console.log('show');
            _draggablePanel.current.show();
        } else if (!listVisibility) {
            console.log('hide');
            _draggablePanel.current.hide();
        }
    }, [listVisibility]);

    return (
        <SlidingUpPanel
            ref={_draggablePanel}
            draggableRange={{
                top: displayData.length > 0 ? CARD_HEIGHT + 60 : 50,
                bottom: 50,
            }}
            minimumVelocityThreshold={100}
            height={CARD_HEIGHT + 60}
            snappingPoints={[CARD_HEIGHT + 60]}
            allowMomentum={true}
            friction={0.3}
            // allowDragging={false}
            animatedValue={draggableValue}>
            <View style={styles.footer}>
                <View style={styles.row}>
                    {/* {endLocation && (
                        <View style={styles.markerWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    getDirections(myRegion, endLocation);
                                }}>
                                <View
                                    style={[
                                        styles.locationIcon,
                                        {
                                            transform: [
                                                {rotate: '-120deg'},
                                                {translateY: 2},
                                                {translateX: -2},
                                            ],
                                        },
                                    ]}>
                                    <Ionicons
                                        name="navigate"
                                        size={24}
                                        color={colors.blue}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )} */}
                    <View
                        style={{
                            borderWidth: 0.001,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {/* <View
                            style={{
                                borderWidth: 2,
                                borderColor: colors.dimGray,
                                borderRadius: BORDER_RADIUS,
                                width: 80,
                                marginLeft: 60,
                                marginBottom: -20,
                            }}
                        /> */}
                    </View>
                    {displayData.length > 0 && (
                        <View
                            style={[
                                styles.markerWrapper,
                                {
                                    marginRight: 10,
                                },
                            ]}>
                            <TouchableOpacity onPress={toggler}>
                                <View style={styles.locationIcon}>
                                    <Ionicons
                                        name="md-list-outline"
                                        size={24}
                                        color={colors.lightBlue}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.markerWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                regionSelected(myRegion);
                            }}>
                            <View style={styles.locationIcon}>
                                <Ionicons
                                    name="locate-outline"
                                    size={24}
                                    color={colors.lightBlue}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
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
                    {!!displayData &&
                        displayData.map((region, index) => {
                            return (
                                <MarkerCard
                                    onPress={() => {
                                        regionSelected(region);
                                        // showPanel();
                                        showDescription(region);
                                        setMapMode(MAP_WITH_DESC);
                                    }}
                                    key={index}
                                    {...region}
                                />
                            );
                        })}
                </Animated.ScrollView>
            </View>
        </SlidingUpPanel>
    );
};

const mapStateToProps = ({mapState, listState}) => ({
    myRegion: mapState.myRegion,
    displayData: mapState.displayDataList,
    panelVisibility: listState.panelVisibility,
    pressedMarkerId: mapState.pressedMarkerId,
    endLocation: mapState.endLocation,
});

const mapDispatchToProps = (dispatch) => ({
    regionSelected: (region) => dispatch(regionSelected(region)),
    setMyRegion: (region) => dispatch(setMyRegion(region)),
    showPanel: () => dispatch(showPanel()),
    showDescription: (region) => dispatch(showDescription(region)),
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    getDirections: (start, end) => dispatch(getDirections(start, end)),
    toggleList: () => dispatch(toggleList()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(List);

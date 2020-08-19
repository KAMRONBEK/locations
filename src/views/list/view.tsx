import React, {useEffect, forwardRef, useRef} from 'react';
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
    mapPressed,
} from '../../redux/actions';
import MarkerCard from '../../component/common/MarkerCard';
import {getDirections} from '../../redux/thunks';

const DraggableList = ({
    myRegion,
    displayData,
    panelVisibility,
    regionSelected,
    setMyRegion,
    pressedMarkerId,
    showPanel,
    showDescription,
    mapPressed,
    endLocation,
    getDirections,
}) => {
    let draggableValue = new Animated.Value(0);
    let mapAnimation = new Animated.Value(0);

    const _scrollView = useRef<ScrollView>(null);
    const _draggablePanel = useRef<SlidingUpPanel>(null);

    // useEffect(() => {
    //     console.log(panelVisibility, 'panel');
    //     if (_draggablePanel.current && panelVisibility) {
    //         console.log('panel show');
    //         _draggablePanel.current.show();
    //     } else if (_draggablePanel.current && !panelVisibility) {
    //         _draggablePanel.current.hide();
    //     }
    // }, [panelVisibility]);

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

    return (
        <SlidingUpPanel
            ref={_draggablePanel}
            draggableRange={{
                top: CARD_HEIGHT + 60,
                bottom: CARD_HEIGHT / 2 + 40,
            }}
            minimumVelocityThreshold={100}
            height={CARD_HEIGHT + 60}
            snappingPoints={[CARD_HEIGHT / 3 + 60]}
            allowMomentum={true}
            friction={0.3}
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
                            {useNativeDriver: true},
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
                                        mapPressed(MAP_WITH_DESC);
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

const mapStateToProps = ({mapState, dragPanelState}) => ({
    myRegion: mapState.myRegion,
    displayData: mapState.displayDataList,
    panelVisibility: dragPanelState.panelVisibility,
    pressedMarkerId: mapState.pressedMarkerId,
    endLocation: mapState.endLocation,
});

const mapDispatchToProps = (dispatch) => ({
    regionSelected: (region) => dispatch(regionSelected(region)),
    setMyRegion: (region) => dispatch(setMyRegion(region)),
    showPanel: () => dispatch(showPanel()),
    showDescription: (region) => dispatch(showDescription(region)),
    mapPressed: (mode) => dispatch(mapPressed(mode)),
    getDirections: (start, end) => dispatch(getDirections(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(DraggableList);

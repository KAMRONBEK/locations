import React, {useEffect, forwardRef} from 'react';
import {StyleSheet, Text, View, Animated, Platform} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
    CARD_HEIGHT,
    CARD_WIDTH,
    SPACING_FOR_CARD_INSET,
    colors,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
} from '../../constants';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {setMyRegion} from '../../redux/actions';
import MarkerCard from '../../component/common/MarkerCard';

const DraggableList = forwardRef(
    ({myRegion, displayData, mapRef, listRef, panelVisibility}, ref) => {
        let draggableValue = new Animated.Value(0);
        let mapAnimation = new Animated.Value(0);

        const onLocationPress = () => {
            if (mapRef.current) {
                mapRef.current.animateToRegion(myRegion, 1000);
            }
        };

        const onCardPress = (region) => {
            if (mapRef.current) {
                mapRef.current.animateToRegion(
                    {
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    1200,
                );
            }
        };

        useEffect(() => {
            console.log(panelVisibility);

            if (ref.current && panelVisibility) {
                ref.current.show();
            } else if (ref.current && !panelVisibility) {
                ref.current.hide();
            }
        }, [panelVisibility]);

        return (
            <SlidingUpPanel
                ref={ref}
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
                                    color={colors.blue}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Animated.ScrollView
                        ref={listRef}
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
                                        onPress={() => onCardPress(region)}
                                        key={index}
                                        {...region}
                                    />
                                );
                            })}
                    </Animated.ScrollView>
                </View>
            </SlidingUpPanel>
        );
    },
);

const mapStateToProps = ({mapState, dragPanelState}) => ({
    myRegion: mapState.myRegion,
    displayData: mapState.displayDataList,
    panelVisibility: dragPanelState.panelVisibility,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(DraggableList);

import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';
import {deviceHeight} from '../../constants';

interface SwiperProps {
    children: any;
    animatedValue: any;
}

const Swiper = ({children, animatedValue}: SwiperProps) => {
    // animatedValue = height;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return !(
                    gestureState.dy === 0 ||
                    (gestureState.dy < 1 && gestureState.dy > -2)
                );
            },
            onPanResponderGrant: (evt, gestureState) => {
                // @ts-ignore
                animatedValue.setOffset(animatedValue._value);
            },
            onPanResponderMove: (evt, gestureState) => {
                animatedValue.setValue(gestureState.dy * 1);
            },
            onPanResponderRelease: (evt, gestureState) => {
                animatedValue.flattenOffset();
                if (gestureState.dy > 0) {
                    Animated.spring(animatedValue, {
                        toValue: deviceHeight,
                        useNativeDriver: false,
                    }).start();
                } else if (gestureState.dy < 0) {
                    Animated.spring(animatedValue, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;

    const collapse = animatedValue.interpolate({
        inputRange: [0, deviceHeight - 140],
        outputRange: [0, deviceHeight - 140],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.container,
                {
                    top: collapse,
                },
            ]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        flex: 1,
        bottom: 0,
        width: '100%',
    },
});

export default Swiper;
